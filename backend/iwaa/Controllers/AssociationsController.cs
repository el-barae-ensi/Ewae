using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using iwaa.Data;
using iwaa.Models;
using iwaa.DTOs;

namespace iwaa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AssociationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AssociationsController> _logger;

        public AssociationsController(ApplicationDbContext context, ILogger<AssociationsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get all associations with optional filtering and pagination
        /// </summary>
        /// <param name="filter">Filter parameters</param>
        /// <returns>Paginated list of associations</returns>
        [HttpGet]
        [Authorize(Policy = "ViewAssociations")]
        public async Task<ActionResult<ApiResponse<PaginatedResponse<AssociationDto>>>> GetAssociations([FromQuery] AssociationFilterDto filter)
        {
            try
            {
                var query = _context.Associations
                    .Where(a => a.IsActive)
                    .AsQueryable();

                // Apply filters
                if (!string.IsNullOrEmpty(filter.SearchTerm))
                {
                    query = query.Where(a =>
                        a.Name.Contains(filter.SearchTerm) ||
                        a.President.Contains(filter.SearchTerm) ||
                        a.Email.Contains(filter.SearchTerm) ||
                        a.Address.Contains(filter.SearchTerm));
                }

                if (!string.IsNullOrEmpty(filter.Region))
                {
                    query = query.Where(a => a.Region == filter.Region);
                }

                if (filter.Status.HasValue)
                {
                    query = query.Where(a => a.Status == filter.Status);
                }

                if (!string.IsNullOrEmpty(filter.Type))
                {
                    query = query.Where(a => a.Type == filter.Type);
                }

                if (filter.RiskLevel.HasValue)
                {
                    query = query.Where(a => a.RiskLevel == filter.RiskLevel);
                }

                // Apply sorting
                if (!string.IsNullOrEmpty(filter.SortBy))
                {
                    switch (filter.SortBy.ToLower())
                    {
                        case "name":
                            query = filter.SortDescending ? query.OrderByDescending(a => a.Name) : query.OrderBy(a => a.Name);
                            break;
                        case "createdat":
                            query = filter.SortDescending ? query.OrderByDescending(a => a.CreatedAt) : query.OrderBy(a => a.CreatedAt);
                            break;
                        case "members":
                            query = filter.SortDescending ? query.OrderByDescending(a => a.Members) : query.OrderBy(a => a.Members);
                            break;
                        case "budget":
                            query = filter.SortDescending ? query.OrderByDescending(a => a.Budget) : query.OrderBy(a => a.Budget);
                            break;
                        default:
                            query = query.OrderByDescending(a => a.CreatedAt);
                            break;
                    }
                }
                else
                {
                    query = query.OrderByDescending(a => a.CreatedAt);
                }

                var totalCount = await query.CountAsync();
                var associations = await query
                    .Skip((filter.PageNumber - 1) * filter.PageSize)
                    .Take(filter.PageSize)
                    .Include(a => a.CreatedBy)
                    .ToListAsync();

                var associationDtos = associations.Select(a => new AssociationDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Type = a.Type,
                    Status = a.Status,
                    Region = a.Region,
                    Address = a.Address,
                    Phone = a.Phone,
                    Email = a.Email,
                    President = a.President,
                    FoundedDate = a.FoundedDate,
                    Members = a.Members,
                    Budget = a.Budget,
                    Projects = !string.IsNullOrEmpty(a.Projects) ?
                        System.Text.Json.JsonSerializer.Deserialize<List<string>>(a.Projects) : null,
                    LastInspection = a.LastInspection,
                    InspectionStatus = a.InspectionStatus,
                    RiskLevel = a.RiskLevel,
                    CreatedAt = a.CreatedAt,
                    UpdatedAt = a.UpdatedAt,
                    CreatedBy = a.CreatedBy?.UserName,
                    Notes = a.Notes,
                    LegalRegistrationNumber = a.LegalRegistrationNumber,
                    LegalRegistrationDate = a.LegalRegistrationDate,
                    BankAccountNumber = a.BankAccountNumber,
                    WebsiteUrl = a.WebsiteUrl,
                    IsActive = a.IsActive
                }).ToList();

                var response = new PaginatedResponse<AssociationDto>
                {
                    Data = associationDtos,
                    TotalCount = totalCount,
                    PageNumber = filter.PageNumber,
                    PageSize = filter.PageSize
                };

                return Ok(ApiResponse<PaginatedResponse<AssociationDto>>.SuccessResult(response));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving associations");
                return StatusCode(500, ApiResponse<PaginatedResponse<AssociationDto>>.ErrorResult("Erreur lors de la récupération des associations"));
            }
        }

        /// <summary>
        /// Get association by ID
        /// </summary>
        /// <param name="id">Association ID</param>
        /// <returns>Association details</returns>
        [HttpGet("{id}")]
        [Authorize(Policy = "ViewAssociations")]
        public async Task<ActionResult<ApiResponse<AssociationDto>>> GetAssociation(int id)
        {
            try
            {
                var association = await _context.Associations
                    .Include(a => a.CreatedBy)
                    .Include(a => a.Residents)
                    .Include(a => a.Donations)
                    .Include(a => a.Alerts)
                    .FirstOrDefaultAsync(a => a.Id == id && a.IsActive);

                if (association == null)
                {
                    return NotFound(ApiResponse<AssociationDto>.ErrorResult("Association introuvable"));
                }

                var associationDto = new AssociationDto
                {
                    Id = association.Id,
                    Name = association.Name,
                    Type = association.Type,
                    Status = association.Status,
                    Region = association.Region,
                    Address = association.Address,
                    Phone = association.Phone,
                    Email = association.Email,
                    President = association.President,
                    FoundedDate = association.FoundedDate,
                    Members = association.Members,
                    Budget = association.Budget,
                    Projects = !string.IsNullOrEmpty(association.Projects) ?
                        System.Text.Json.JsonSerializer.Deserialize<List<string>>(association.Projects) : null,
                    LastInspection = association.LastInspection,
                    InspectionStatus = association.InspectionStatus,
                    RiskLevel = association.RiskLevel,
                    CreatedAt = association.CreatedAt,
                    UpdatedAt = association.UpdatedAt,
                    CreatedBy = association.CreatedBy?.UserName,
                    Notes = association.Notes,
                    LegalRegistrationNumber = association.LegalRegistrationNumber,
                    LegalRegistrationDate = association.LegalRegistrationDate,
                    BankAccountNumber = association.BankAccountNumber,
                    WebsiteUrl = association.WebsiteUrl,
                    IsActive = association.IsActive
                };

                return Ok(ApiResponse<AssociationDto>.SuccessResult(associationDto));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving association {Id}", id);
                return StatusCode(500, ApiResponse<AssociationDto>.ErrorResult("Erreur lors de la récupération de l'association"));
            }
        }

        /// <summary>
        /// Create a new association
        /// </summary>
        /// <param name="request">Association creation data</param>
        /// <returns>Created association</returns>
        [HttpPost]
        [Authorize(Policy = "ManageAssociations")]
        public async Task<ActionResult<ApiResponse<AssociationDto>>> CreateAssociation([FromBody] CreateAssociationRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return BadRequest(ApiResponse<AssociationDto>.ErrorResult("Données invalides", errors));
            }

            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                var association = new Association
                {
                    Name = request.Name,
                    Type = request.Type,
                    Region = request.Region,
                    Address = request.Address,
                    Phone = request.Phone,
                    Email = request.Email,
                    President = request.President,
                    FoundedDate = request.FoundedDate,
                    Members = request.Members,
                    Budget = request.Budget,
                    Projects = request.Projects != null ?
                        System.Text.Json.JsonSerializer.Serialize(request.Projects) : null,
                    RiskLevel = request.RiskLevel,
                    CreatedById = userId,
                    Notes = request.Notes,
                    LegalRegistrationNumber = request.LegalRegistrationNumber,
                    LegalRegistrationDate = request.LegalRegistrationDate,
                    BankAccountNumber = request.BankAccountNumber,
                    WebsiteUrl = request.WebsiteUrl,
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                };

                _context.Associations.Add(association);
                await _context.SaveChangesAsync();

                // Reload with related data
                association = await _context.Associations
                    .Include(a => a.CreatedBy)
                    .FirstAsync(a => a.Id == association.Id);

                var associationDto = new AssociationDto
                {
                    Id = association.Id,
                    Name = association.Name,
                    Type = association.Type,
                    Status = association.Status,
                    Region = association.Region,
                    Address = association.Address,
                    Phone = association.Phone,
                    Email = association.Email,
                    President = association.President,
                    FoundedDate = association.FoundedDate,
                    Members = association.Members,
                    Budget = association.Budget,
                    Projects = request.Projects,
                    LastInspection = association.LastInspection,
                    InspectionStatus = association.InspectionStatus,
                    RiskLevel = association.RiskLevel,
                    CreatedAt = association.CreatedAt,
                    UpdatedAt = association.UpdatedAt,
                    CreatedBy = association.CreatedBy?.UserName,
                    Notes = association.Notes,
                    LegalRegistrationNumber = association.LegalRegistrationNumber,
                    LegalRegistrationDate = association.LegalRegistrationDate,
                    BankAccountNumber = association.BankAccountNumber,
                    WebsiteUrl = association.WebsiteUrl,
                    IsActive = association.IsActive
                };

                _logger.LogInformation("Association created: {AssociationId} by user {UserId}", association.Id, userId);
                return CreatedAtAction(nameof(GetAssociation), new { id = association.Id },
                    ApiResponse<AssociationDto>.SuccessResult(associationDto, "Association créée avec succès"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating association");
                return StatusCode(500, ApiResponse<AssociationDto>.ErrorResult("Erreur lors de la création de l'association"));
            }
        }

        /// <summary>
        /// Update an existing association
        /// </summary>
        /// <param name="id">Association ID</param>
        /// <param name="request">Association update data</param>
        /// <returns>Updated association</returns>
        [HttpPut("{id}")]
        [Authorize(Policy = "ManageAssociations")]
        public async Task<ActionResult<ApiResponse<AssociationDto>>> UpdateAssociation(int id, [FromBody] UpdateAssociationRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return BadRequest(ApiResponse<AssociationDto>.ErrorResult("Données invalides", errors));
            }

            try
            {
                var association = await _context.Associations
                    .FirstOrDefaultAsync(a => a.Id == id && a.IsActive);

                if (association == null)
                {
                    return NotFound(ApiResponse<AssociationDto>.ErrorResult("Association introuvable"));
                }

                // Update properties
                association.Name = request.Name;
                association.Type = request.Type;
                association.Status = request.Status;
                association.Region = request.Region;
                association.Address = request.Address;
                association.Phone = request.Phone;
                association.Email = request.Email;
                association.President = request.President;
                association.FoundedDate = request.FoundedDate;
                association.Members = request.Members;
                association.Budget = request.Budget;
                association.Projects = request.Projects != null ?
                    System.Text.Json.JsonSerializer.Serialize(request.Projects) : null;
                association.LastInspection = request.LastInspection;
                association.InspectionStatus = request.InspectionStatus;
                association.RiskLevel = request.RiskLevel;
                association.Notes = request.Notes;
                association.LegalRegistrationNumber = request.LegalRegistrationNumber;
                association.LegalRegistrationDate = request.LegalRegistrationDate;
                association.BankAccountNumber = request.BankAccountNumber;
                association.WebsiteUrl = request.WebsiteUrl;
                association.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                // Reload with related data
                association = await _context.Associations
                    .Include(a => a.CreatedBy)
                    .FirstAsync(a => a.Id == association.Id);

                var associationDto = new AssociationDto
                {
                    Id = association.Id,
                    Name = association.Name,
                    Type = association.Type,
                    Status = association.Status,
                    Region = association.Region,
                    Address = association.Address,
                    Phone = association.Phone,
                    Email = association.Email,
                    President = association.President,
                    FoundedDate = association.FoundedDate,
                    Members = association.Members,
                    Budget = association.Budget,
                    Projects = request.Projects,
                    LastInspection = association.LastInspection,
                    InspectionStatus = association.InspectionStatus,
                    RiskLevel = association.RiskLevel,
                    CreatedAt = association.CreatedAt,
                    UpdatedAt = association.UpdatedAt,
                    CreatedBy = association.CreatedBy?.UserName,
                    Notes = association.Notes,
                    LegalRegistrationNumber = association.LegalRegistrationNumber,
                    LegalRegistrationDate = association.LegalRegistrationDate,
                    BankAccountNumber = association.BankAccountNumber,
                    WebsiteUrl = association.WebsiteUrl,
                    IsActive = association.IsActive
                };

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                _logger.LogInformation("Association updated: {AssociationId} by user {UserId}", association.Id, userId);

                return Ok(ApiResponse<AssociationDto>.SuccessResult(associationDto, "Association mise à jour avec succès"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating association {Id}", id);
                return StatusCode(500, ApiResponse<AssociationDto>.ErrorResult("Erreur lors de la mise à jour de l'association"));
            }
        }

        /// <summary>
        /// Delete an association (soft delete)
        /// </summary>
        /// <param name="id">Association ID</param>
        /// <returns>Success or error message</returns>
        [HttpDelete("{id}")]
        [Authorize(Policy = "ManageAssociations")]
        public async Task<ActionResult<ApiResponse>> DeleteAssociation(int id)
        {
            try
            {
                var association = await _context.Associations
                    .FirstOrDefaultAsync(a => a.Id == id && a.IsActive);

                if (association == null)
                {
                    return NotFound(ApiResponse.ErrorResult("Association introuvable"));
                }

                // Soft delete
                association.IsActive = false;
                association.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                _logger.LogInformation("Association deleted: {AssociationId} by user {UserId}", id, userId);

                return Ok(ApiResponse.SuccessResult("Association supprimée avec succès"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting association {Id}", id);
                return StatusCode(500, ApiResponse.ErrorResult("Erreur lors de la suppression de l'association"));
            }
        }

        /// <summary>
        /// Get association statistics
        /// </summary>
        /// <param name="id">Association ID</param>
        /// <returns>Association statistics</returns>
        [HttpGet("{id}/statistics")]
        [Authorize(Policy = "ViewAssociations")]
        public async Task<ActionResult<ApiResponse<object>>> GetAssociationStatistics(int id)
        {
            try
            {
                var association = await _context.Associations
                    .Include(a => a.Residents)
                    .Include(a => a.Donations)
                    .Include(a => a.Alerts)
                    .FirstOrDefaultAsync(a => a.Id == id && a.IsActive);

                if (association == null)
                {
                    return NotFound(ApiResponse<object>.ErrorResult("Association introuvable"));
                }

                var stats = new
                {
                    TotalResidents = association.Residents.Count(r => r.IsActive),
                    VulnerableResidents = association.Residents.Count(r => r.IsActive && r.IsVulnerable),
                    TotalDonations = association.Donations.Where(d => d.Status == DonationStatus.Completed).Sum(d => d.Amount),
                    DonationsThisMonth = association.Donations
                        .Where(d => d.Status == DonationStatus.Completed && d.Date.Month == DateTime.Now.Month && d.Date.Year == DateTime.Now.Year)
                        .Sum(d => d.Amount),
                    OpenAlerts = association.Alerts.Count(a => a.Status == AlertStatus.Open),
                    HighPriorityAlerts = association.Alerts.Count(a => a.Status == AlertStatus.Open && a.Priority == AlertPriority.High),
                    RecentActivity = new
                    {
                        LastDonation = association.Donations
                            .Where(d => d.Status == DonationStatus.Completed)
                            .OrderByDescending(d => d.Date)
                            .FirstOrDefault()?.Date,
                        LastAlert = association.Alerts
                            .OrderByDescending(a => a.CreatedAt)
                            .FirstOrDefault()?.CreatedAt,
                        LastInspection = association.LastInspection
                    }
                };

                return Ok(ApiResponse<object>.SuccessResult(stats));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving association statistics for {Id}", id);
                return StatusCode(500, ApiResponse<object>.ErrorResult("Erreur lors de la récupération des statistiques"));
            }
        }

        /// <summary>
        /// Get associations summary/options for dropdowns
        /// </summary>
        /// <returns>List of association options</returns>
        [HttpGet("options")]
        public async Task<ActionResult<ApiResponse<List<object>>>> GetAssociationOptions()
        {
            try
            {
                var associations = await _context.Associations
                    .Where(a => a.IsActive && a.Status == AssociationStatus.Active)
                    .Select(a => new { a.Id, a.Name, a.Type, a.Region })
                    .OrderBy(a => a.Name)
                    .ToListAsync();

                return Ok(ApiResponse<List<object>>.SuccessResult(associations.Cast<object>().ToList()));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving association options");
                return StatusCode(500, ApiResponse<List<object>>.ErrorResult("Erreur lors de la récupération des options d'associations"));
            }
        }

        /// <summary>
        /// Get unique regions for filtering
        /// </summary>
        /// <returns>List of regions</returns>
        [HttpGet("regions")]
        public async Task<ActionResult<ApiResponse<List<string>>>> GetRegions()
        {
            try
            {
                var regions = await _context.Associations
                    .Where(a => a.IsActive)
                    .Select(a => a.Region)
                    .Distinct()
                    .OrderBy(r => r)
                    .ToListAsync();

                return Ok(ApiResponse<List<string>>.SuccessResult(regions));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving regions");
                return StatusCode(500, ApiResponse<List<string>>.ErrorResult("Erreur lors de la récupération des régions"));
            }
        }

        /// <summary>
        /// Get unique association types for filtering
        /// </summary>
        /// <returns>List of association types</returns>
        [HttpGet("types")]
        public async Task<ActionResult<ApiResponse<List<string>>>> GetAssociationTypes()
        {
            try
            {
                var types = await _context.Associations
                    .Where(a => a.IsActive)
                    .Select(a => a.Type)
                    .Distinct()
                    .OrderBy(t => t)
                    .ToListAsync();

                return Ok(ApiResponse<List<string>>.SuccessResult(types));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving association types");
                return StatusCode(500, ApiResponse<List<string>>.ErrorResult("Erreur lors de la récupération des types d'associations"));
            }
        }
    }
}
