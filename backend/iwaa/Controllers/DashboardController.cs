using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using iwaa.Data;
using iwaa.Models;
using iwaa.DTOs;

namespace iwaa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(ApplicationDbContext context, ILogger<DashboardController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get dashboard statistics for the current user's role
        /// </summary>
        /// <returns>Dashboard statistics</returns>
        [HttpGet("stats")]
        public async Task<ActionResult<ApiResponse<DashboardStatsDto>>> GetDashboardStats()
        {
            try
            {
                var userRole = User.FindFirst("role")?.Value;
                var stats = new DashboardStatsDto();

                // Basic statistics
                stats.TotalAssociations = await _context.Associations
                    .CountAsync(a => a.IsActive);

                stats.ActiveAssociations = await _context.Associations
                    .CountAsync(a => a.IsActive && a.Status == AssociationStatus.Active);

                stats.TotalResidents = await _context.Residents
                    .CountAsync(r => r.IsActive);

                stats.VulnerableResidents = await _context.Residents
                    .CountAsync(r => r.IsActive && r.IsVulnerable);

                stats.TotalDonations = await _context.Donations
                    .Where(d => d.Status == DonationStatus.Completed)
                    .SumAsync(d => d.Amount);

                var currentMonth = DateTime.Now;
                stats.DonationsThisMonth = await _context.Donations
                    .Where(d => d.Status == DonationStatus.Completed &&
                               d.Date.Month == currentMonth.Month &&
                               d.Date.Year == currentMonth.Year)
                    .CountAsync();

                stats.OpenAlerts = await _context.Alerts
                    .CountAsync(a => a.IsActive && a.Status == AlertStatus.Open);

                stats.HighPriorityAlerts = await _context.Alerts
                    .CountAsync(a => a.IsActive &&
                               a.Status == AlertStatus.Open &&
                               a.Priority == AlertPriority.High);

                stats.PendingDeclarations = await _context.Declarations
                    .CountAsync(d => d.IsActive &&
                               (d.Status == DeclarationStatus.Submitted ||
                                d.Status == DeclarationStatus.UnderReview));

                stats.ReportsGenerated = await _context.Reports
                    .CountAsync(r => r.IsActive && r.Status == ReportStatus.Generated);

                // Chart data
                stats.AssociationsByRegion = await GetAssociationsByRegion();
                stats.DonationsByType = await GetDonationsByType();
                stats.AlertsByPriority = await GetAlertsByPriority();
                stats.MonthlyDonations = await GetMonthlyDonations();
                stats.MonthlyAlerts = await GetMonthlyAlerts();

                return Ok(ApiResponse<DashboardStatsDto>.SuccessResult(stats));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving dashboard statistics");
                return StatusCode(500, ApiResponse<DashboardStatsDto>.ErrorResult("Erreur lors de la récupération des statistiques"));
            }
        }

        /// <summary>
        /// Get recent activities for dashboard
        /// </summary>
        /// <param name="limit">Number of recent activities to return</param>
        /// <returns>List of recent activities</returns>
        [HttpGet("recent-activities")]
        public async Task<ActionResult<ApiResponse<List<object>>>> GetRecentActivities([FromQuery] int limit = 10)
        {
            try
            {
                var activities = new List<object>();

                // Recent donations
                var recentDonations = await _context.Donations
                    .Include(d => d.TargetAssociation)
                    .Where(d => d.Status == DonationStatus.Completed)
                    .OrderByDescending(d => d.Date)
                    .Take(limit / 4)
                    .Select(d => new
                    {
                        Id = d.Id,
                        Type = "donation",
                        Title = $"Don de {d.Amount:C} MAD",
                        Description = $"Don {d.Type.GetDisplayName()} pour {d.TargetAssociation!.Name}",
                        Date = d.Date,
                        Icon = "bi-heart-fill",
                        Color = "success"
                    })
                    .ToListAsync();

                activities.AddRange(recentDonations.Cast<object>());

                // Recent alerts
                var recentAlerts = await _context.Alerts
                    .Include(a => a.Association)
                    .Where(a => a.IsActive)
                    .OrderByDescending(a => a.CreatedAt)
                    .Take(limit / 4)
                    .Select(a => new
                    {
                        Id = a.Id,
                        Type = "alert",
                        Title = a.Title,
                        Description = $"Alerte {a.Priority.GetPriorityDisplayName()} - {a.Association!.Name}",
                        Date = a.CreatedAt,
                        Icon = "bi-exclamation-triangle-fill",
                        Color = a.Priority.GetPriorityColor()
                    })
                    .ToListAsync();

                activities.AddRange(recentAlerts.Cast<object>());

                // Recent declarations
                var recentDeclarations = await _context.Declarations
                    .Where(d => d.IsActive)
                    .OrderByDescending(d => d.CreatedAt)
                    .Take(limit / 4)
                    .Select(d => new
                    {
                        Id = d.Id,
                        Type = "declaration",
                        Title = d.Subject,
                        Description = $"Déclaration {d.Type.GetTypeDisplayName()} - {d.DeclarantName}",
                        Date = d.CreatedAt,
                        Icon = "bi-file-text-fill",
                        Color = "info"
                    })
                    .ToListAsync();

                activities.AddRange(recentDeclarations.Cast<object>());

                // Recent associations
                var recentAssociations = await _context.Associations
                    .Where(a => a.IsActive)
                    .OrderByDescending(a => a.CreatedAt)
                    .Take(limit / 4)
                    .Select(a => new
                    {
                        Id = a.Id,
                        Type = "association",
                        Title = a.Name,
                        Description = $"Nouvelle association - {a.Type} ({a.Region})",
                        Date = a.CreatedAt,
                        Icon = "bi-building-fill",
                        Color = "primary"
                    })
                    .ToListAsync();

                activities.AddRange(recentAssociations.Cast<object>());

                // Sort all activities by date and take the most recent
                var sortedActivities = activities
                    .OrderByDescending(a => ((dynamic)a).Date)
                    .Take(limit)
                    .ToList();

                return Ok(ApiResponse<List<object>>.SuccessResult(sortedActivities));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving recent activities");
                return StatusCode(500, ApiResponse<List<object>>.ErrorResult("Erreur lors de la récupération des activités récentes"));
            }
        }

        /// <summary>
        /// Get role-specific metrics
        /// </summary>
        /// <returns>Role-specific dashboard metrics</returns>
        [HttpGet("role-metrics")]
        public async Task<ActionResult<ApiResponse<object>>> GetRoleMetrics()
        {
            try
            {
                var userRole = User.FindFirst("role")?.Value;
                object metrics = new { };

                switch (userRole)
                {
                    case "AgentSecurite":
                        metrics = await GetAgentSecuriteMetrics();
                        break;
                    case "GroupeAssociatif":
                        metrics = await GetGroupeAssociatifMetrics();
                        break;
                    case "Public":
                        metrics = await GetPublicMetrics();
                        break;
                    case "GestionPersona":
                        metrics = await GetGestionPersonaMetrics();
                        break;
                    case "Twaa":
                        metrics = await GetTwaaMetrics();
                        break;
                }

                return Ok(ApiResponse<object>.SuccessResult(metrics));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving role-specific metrics");
                return StatusCode(500, ApiResponse<object>.ErrorResult("Erreur lors de la récupération des métriques"));
            }
        }

        /// <summary>
        /// Get system health status
        /// </summary>
        /// <returns>System health information</returns>
        [HttpGet("health")]
        [Authorize(Policy = "Twaa")]
        public async Task<ActionResult<ApiResponse<object>>> GetSystemHealth()
        {
            try
            {
                var health = new
                {
                    DatabaseConnected = await _context.Database.CanConnectAsync(),
                    TotalRecords = new
                    {
                        Users = await _context.Users.CountAsync(),
                        Associations = await _context.Associations.CountAsync(),
                        Residents = await _context.Residents.CountAsync(),
                        Donations = await _context.Donations.CountAsync(),
                        Alerts = await _context.Alerts.CountAsync()
                    },
                    SystemInfo = new
                    {
                        ServerTime = DateTime.UtcNow,
                        Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"),
                        Version = "1.0.0"
                    }
                };

                return Ok(ApiResponse<object>.SuccessResult(health));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving system health");
                return StatusCode(500, ApiResponse<object>.ErrorResult("Erreur lors de la vérification de l'état du système"));
            }
        }

        private async Task<List<ChartDataDto>> GetAssociationsByRegion()
        {
            return await _context.Associations
                .Where(a => a.IsActive)
                .GroupBy(a => a.Region)
                .Select(g => new ChartDataDto
                {
                    Label = g.Key,
                    Value = g.Count()
                })
                .OrderByDescending(c => c.Value)
                .ToListAsync();
        }

        private async Task<List<ChartDataDto>> GetDonationsByType()
        {
            return await _context.Donations
                .Where(d => d.Status == DonationStatus.Completed)
                .GroupBy(d => d.Type)
                .Select(g => new ChartDataDto
                {
                    Label = g.Key.GetDisplayName(),
                    Value = g.Sum(d => d.Amount)
                })
                .OrderByDescending(c => c.Value)
                .ToListAsync();
        }

        private async Task<List<ChartDataDto>> GetAlertsByPriority()
        {
            return await _context.Alerts
                .Where(a => a.IsActive && a.Status == AlertStatus.Open)
                .GroupBy(a => a.Priority)
                .Select(g => new ChartDataDto
                {
                    Label = g.Key.GetPriorityDisplayName(),
                    Value = g.Count(),
                    Color = g.Key.GetPriorityColor()
                })
                .OrderBy(c => (int)Enum.Parse<AlertPriority>(c.Label))
                .ToListAsync();
        }

        private async Task<List<TimeSeriesDataDto>> GetMonthlyDonations()
        {
            var startDate = DateTime.Now.AddMonths(-11).Date;
            var donations = await _context.Donations
                .Where(d => d.Status == DonationStatus.Completed && d.Date >= startDate)
                .GroupBy(d => new { d.Date.Year, d.Date.Month })
                .Select(g => new TimeSeriesDataDto
                {
                    Date = new DateTime(g.Key.Year, g.Key.Month, 1),
                    Value = g.Sum(d => d.Amount),
                    Label = $"{g.Key.Month:00}/{g.Key.Year}"
                })
                .OrderBy(t => t.Date)
                .ToListAsync();

            return donations;
        }

        private async Task<List<TimeSeriesDataDto>> GetMonthlyAlerts()
        {
            var startDate = DateTime.Now.AddMonths(-11).Date;
            var alerts = await _context.Alerts
                .Where(a => a.CreatedAt >= startDate)
                .GroupBy(a => new { a.CreatedAt.Year, a.CreatedAt.Month })
                .Select(g => new TimeSeriesDataDto
                {
                    Date = new DateTime(g.Key.Year, g.Key.Month, 1),
                    Value = g.Count(),
                    Label = $"{g.Key.Month:00}/{g.Key.Year}"
                })
                .OrderBy(t => t.Date)
                .ToListAsync();

            return alerts;
        }

        private async Task<object> GetAgentSecuriteMetrics()
        {
            return new
            {
                AssociationsUnderReview = await _context.Associations
                    .CountAsync(a => a.IsActive && a.Status == AssociationStatus.UnderReview),
                HighRiskAssociations = await _context.Associations
                    .CountAsync(a => a.IsActive && a.RiskLevel >= RiskLevel.High),
                OpenSecurityAlerts = await _context.Alerts
                    .CountAsync(a => a.IsActive && a.Status == AlertStatus.Open && a.Type == AlertType.Security),
                ResidentsNeedingReview = await _context.Residents
                    .CountAsync(r => r.IsActive && r.Status == ResidentStatus.UnderReview)
            };
        }

        private async Task<object> GetGroupeAssociatifMetrics()
        {
            return new
            {
                PendingFundingRequests = await _context.FundingRequests
                    .CountAsync(f => f.IsActive && f.Status == FundingRequestStatus.Submitted),
                ActiveComplaints = await _context.Complaints
                    .CountAsync(c => c.IsActive && c.Status != ComplaintStatus.Resolved),
                MonthlyDonationsReceived = await _context.Donations
                    .Where(d => d.Status == DonationStatus.Completed &&
                               d.Date.Month == DateTime.Now.Month &&
                               d.Date.Year == DateTime.Now.Year)
                    .SumAsync(d => d.Amount),
                AssociationMembers = await _context.Associations
                    .Where(a => a.IsActive)
                    .SumAsync(a => a.Members)
            };
        }

        private async Task<object> GetPublicMetrics()
        {
            return new
            {
                MyDeclarations = await _context.Declarations
                    .CountAsync(d => d.IsActive),
                MyDonations = await _context.Donations
                    .CountAsync(d => d.Status == DonationStatus.Completed),
                ActivePartners = await _context.Partners
                    .CountAsync(p => p.IsActive && p.Status == PartnerStatus.Active),
                AvailableServices = 15 // This could be dynamic based on actual services
            };
        }

        private async Task<object> GetGestionPersonaMetrics()
        {
            return new
            {
                TotalPersons = await _context.Residents
                    .CountAsync(r => r.IsActive),
                VulnerablePersons = await _context.Residents
                    .CountAsync(r => r.IsActive && r.IsVulnerable),
                DisabledPersons = await _context.Residents
                    .CountAsync(r => r.IsActive && r.HasDisability),
                GovernmentAidRecipients = await _context.Residents
                    .CountAsync(r => r.IsActive && r.ReceivesGovernmentAid)
            };
        }

        private async Task<object> GetTwaaMetrics()
        {
            return new
            {
                SystemUsers = await _context.Users.CountAsync(u => u.IsActive),
                TotalTransactions = await _context.Donations.CountAsync(),
                SystemAlerts = await _context.Alerts
                    .CountAsync(a => a.IsActive && a.Priority >= AlertPriority.High),
                DatabaseSize = "125.4 MB", // This would come from actual database queries
                ActiveSessions = 23, // This would come from session management
                LastBackup = DateTime.Now.AddDays(-1)
            };
        }
    }
}
