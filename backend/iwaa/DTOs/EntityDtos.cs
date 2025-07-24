using System.ComponentModel.DataAnnotations;
using iwaa.Models;

namespace iwaa.DTOs
{
    // Association DTOs
    public class AssociationDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public AssociationStatus Status { get; set; }
        public string StatusDisplay => Status.GetDisplayName();
        public string Region { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string President { get; set; } = string.Empty;
        public DateTime FoundedDate { get; set; }
        public int Members { get; set; }
        public decimal Budget { get; set; }
        public List<string>? Projects { get; set; }
        public DateTime? LastInspection { get; set; }
        public string? InspectionStatus { get; set; }
        public RiskLevel RiskLevel { get; set; }
        public string RiskLevelDisplay => RiskLevel.GetDisplayName();
        public string RiskLevelColor => RiskLevel.GetColor();
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? Notes { get; set; }
        public string? LegalRegistrationNumber { get; set; }
        public DateTime? LegalRegistrationDate { get; set; }
        public string? BankAccountNumber { get; set; }
        public string? WebsiteUrl { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreateAssociationRequest
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Type { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Region { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string Address { get; set; } = string.Empty;

        [Required]
        [Phone]
        [StringLength(20)]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string President { get; set; } = string.Empty;

        [Required]
        public DateTime FoundedDate { get; set; }

        [Required]
        public int Members { get; set; }

        public decimal Budget { get; set; }

        public List<string>? Projects { get; set; }

        public RiskLevel RiskLevel { get; set; } = RiskLevel.Low;

        public string? Notes { get; set; }

        [StringLength(50)]
        public string? LegalRegistrationNumber { get; set; }

        public DateTime? LegalRegistrationDate { get; set; }

        [StringLength(50)]
        public string? BankAccountNumber { get; set; }

        [Url]
        [StringLength(200)]
        public string? WebsiteUrl { get; set; }
    }

    public class UpdateAssociationRequest : CreateAssociationRequest
    {
        public AssociationStatus Status { get; set; }
        public DateTime? LastInspection { get; set; }
        public string? InspectionStatus { get; set; }
    }

    // Resident DTOs
    public class ResidentDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName => $"{FirstName} {LastName}";
        public string NationalId { get; set; } = string.Empty;
        public DateTime? DateOfBirth { get; set; }
        public int? Age { get; set; }
        public string? Gender { get; set; }
        public string? Nationality { get; set; }
        public ResidentStatus Status { get; set; }
        public string StatusDisplay => Status.GetDisplayName();
        public string StatusColor => Status.GetColor();
        public string Address { get; set; } = string.Empty;
        public string? City { get; set; }
        public string? Region { get; set; }
        public string? PostalCode { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? Profession { get; set; }
        public string? MaritalStatus { get; set; }
        public int? NumberOfChildren { get; set; }
        public decimal? MonthlyIncome { get; set; }
        public bool IsVulnerable { get; set; }
        public string? VulnerabilityReason { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime? LastUpdated { get; set; }
        public string? RegisteredBy { get; set; }
        public string? Notes { get; set; }
        public bool HasDisability { get; set; }
        public string? DisabilityType { get; set; }
        public bool ReceivesGovernmentAid { get; set; }
        public string? GovernmentAidType { get; set; }
        public decimal? GovernmentAidAmount { get; set; }
        public bool IsActive { get; set; }
        public int? AssociationId { get; set; }
        public string? AssociationName { get; set; }
    }

    public class CreateResidentRequest
    {
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string NationalId { get; set; } = string.Empty;

        public DateTime? DateOfBirth { get; set; }

        [StringLength(10)]
        public string? Gender { get; set; }

        [StringLength(50)]
        public string? Nationality { get; set; } = "Marocaine";

        [Required]
        [StringLength(500)]
        public string Address { get; set; } = string.Empty;

        [StringLength(100)]
        public string? City { get; set; }

        [StringLength(100)]
        public string? Region { get; set; }

        [StringLength(20)]
        public string? PostalCode { get; set; }

        [Phone]
        [StringLength(20)]
        public string? Phone { get; set; }

        [EmailAddress]
        [StringLength(100)]
        public string? Email { get; set; }

        [StringLength(100)]
        public string? EmergencyContact { get; set; }

        [Phone]
        [StringLength(20)]
        public string? EmergencyPhone { get; set; }

        [StringLength(100)]
        public string? Profession { get; set; }

        [StringLength(100)]
        public string? MaritalStatus { get; set; }

        public int? NumberOfChildren { get; set; }

        public decimal? MonthlyIncome { get; set; }

        public string? MedicalConditions { get; set; }

        public string? SpecialNeeds { get; set; }

        public bool IsVulnerable { get; set; } = false;

        [StringLength(200)]
        public string? VulnerabilityReason { get; set; }

        public string? Notes { get; set; }

        public bool HasDisability { get; set; } = false;

        [StringLength(200)]
        public string? DisabilityType { get; set; }

        public bool ReceivesGovernmentAid { get; set; } = false;

        [StringLength(200)]
        public string? GovernmentAidType { get; set; }

        public decimal? GovernmentAidAmount { get; set; }

        public int? AssociationId { get; set; }
    }

    public class UpdateResidentRequest : CreateResidentRequest
    {
        public ResidentStatus Status { get; set; }
    }

    // Donation DTOs
    public class DonationDto
    {
        public int Id { get; set; }
        public string Reference { get; set; } = string.Empty;
        public string? DonorName { get; set; }
        public string? DonorEmail { get; set; }
        public string? DonorPhone { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "MAD";
        public DonationType Type { get; set; }
        public string TypeDisplay => Type.GetDisplayName();
        public DonationStatus Status { get; set; }
        public string StatusDisplay => Status.GetDisplayName();
        public string StatusColor => Status.GetColor();
        public DateTime Date { get; set; }
        public DonationMethod Method { get; set; }
        public string MethodDisplay => Method.GetDisplayName();
        public string Purpose { get; set; } = string.Empty;
        public bool IsAnonymous { get; set; }
        public string? Notes { get; set; }
        public bool ReceiptSent { get; set; }
        public bool TaxDeductible { get; set; }
        public DateTime? ProcessedDate { get; set; }
        public string? ProcessedBy { get; set; }
        public string? MaterialDescription { get; set; }
        public int? AssociationId { get; set; }
        public string? TargetAssociation { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateDonationRequest
    {
        [StringLength(100)]
        public string? DonorName { get; set; }

        [EmailAddress]
        [StringLength(100)]
        public string? DonorEmail { get; set; }

        [Phone]
        [StringLength(20)]
        public string? DonorPhone { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        [StringLength(10)]
        public string Currency { get; set; } = "MAD";

        [Required]
        public DonationType Type { get; set; } = DonationType.Monetary;

        [Required]
        public DonationMethod Method { get; set; } = DonationMethod.BankTransfer;

        [Required]
        [StringLength(200)]
        public string Purpose { get; set; } = string.Empty;

        public bool IsAnonymous { get; set; } = false;

        public string? Notes { get; set; }

        public bool TaxDeductible { get; set; } = false;

        [StringLength(500)]
        public string? MaterialDescription { get; set; }

        public int? AssociationId { get; set; }

        public int? CampaignId { get; set; }
    }

    public class UpdateDonationRequest
    {
        public DonationStatus Status { get; set; }
        public string? ProcessingNotes { get; set; }
        public bool ReceiptSent { get; set; }
    }

    // Alert DTOs
    public class AlertDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public AlertType Type { get; set; }
        public string TypeDisplay => Type.GetTypeDisplayName();
        public AlertPriority Priority { get; set; }
        public string PriorityDisplay => Priority.GetPriorityDisplayName();
        public string PriorityColor => Priority.GetPriorityColor();
        public AlertStatus Status { get; set; }
        public string StatusDisplay => Status.GetStatusDisplayName();
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? ResolvedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? AssignedTo { get; set; }
        public string? ResolvedBy { get; set; }
        public string? Resolution { get; set; }
        public string? Location { get; set; }
        public DateTime? IncidentDate { get; set; }
        public int? AssociationId { get; set; }
        public string? AssociationName { get; set; }
        public int? ResidentId { get; set; }
        public string? ResidentName { get; set; }
        public bool IsActive { get; set; }
        public int ViewCount { get; set; }
        public bool IsOverdue { get; set; }
        public TimeSpan? Duration { get; set; }
    }

    public class CreateAlertRequest
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public AlertType Type { get; set; } = AlertType.General;

        [Required]
        public AlertPriority Priority { get; set; } = AlertPriority.Medium;

        [StringLength(500)]
        public string? Location { get; set; }

        public DateTime? IncidentDate { get; set; }

        public int? AssociationId { get; set; }

        public int? ResidentId { get; set; }

        public string? AssignedToId { get; set; }

        public List<string>? Tags { get; set; }
    }

    public class UpdateAlertRequest
    {
        [StringLength(200)]
        public string? Title { get; set; }

        public string? Description { get; set; }

        public AlertType? Type { get; set; }

        public AlertPriority? Priority { get; set; }

        public AlertStatus? Status { get; set; }

        public string? AssignedToId { get; set; }

        public string? Resolution { get; set; }

        [StringLength(500)]
        public string? Location { get; set; }

        public DateTime? IncidentDate { get; set; }
    }

    // Declaration DTOs
    public class DeclarationDto
    {
        public int Id { get; set; }
        public string Reference { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DeclarationType Type { get; set; }
        public string TypeDisplay => Type.GetTypeDisplayName();
        public DeclarationStatus Status { get; set; }
        public string StatusDisplay => Status.GetStatusDisplayName();
        public DeclarationPriority Priority { get; set; }
        public string PriorityDisplay => Priority.GetPriorityDisplayName();
        public string DeclarantName { get; set; } = string.Empty;
        public string? DeclarantEmail { get; set; }
        public string? DeclarantPhone { get; set; }
        public string? DeclarantAddress { get; set; }
        public string? DeclarantNationalId { get; set; }
        public bool IsAnonymous { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? ProcessedAt { get; set; }
        public string? ProcessedBy { get; set; }
        public string? ProcessingNotes { get; set; }
        public string? IncidentLocation { get; set; }
        public DateTime? IncidentDate { get; set; }
        public int? AssociationId { get; set; }
        public string? RelatedAssociation { get; set; }
        public int? ResidentId { get; set; }
        public string? RelatedResident { get; set; }
        public bool RequiresFollowUp { get; set; }
        public DateTime? FollowUpDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreateDeclarationRequest
    {
        [Required]
        [StringLength(200)]
        public string Subject { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DeclarationType Type { get; set; } = DeclarationType.General;

        public DeclarationPriority Priority { get; set; } = DeclarationPriority.Normal;

        [Required]
        [StringLength(100)]
        public string DeclarantName { get; set; } = string.Empty;

        [EmailAddress]
        [StringLength(100)]
        public string? DeclarantEmail { get; set; }

        [Phone]
        [StringLength(20)]
        public string? DeclarantPhone { get; set; }

        [StringLength(500)]
        public string? DeclarantAddress { get; set; }

        [StringLength(20)]
        public string? DeclarantNationalId { get; set; }

        public bool IsAnonymous { get; set; } = false;

        [StringLength(500)]
        public string? IncidentLocation { get; set; }

        public DateTime? IncidentDate { get; set; }

        public int? AssociationId { get; set; }

        public int? ResidentId { get; set; }
    }

    public class UpdateDeclarationRequest
    {
        public DeclarationStatus Status { get; set; }
        public string? ProcessingNotes { get; set; }
        public bool RequiresFollowUp { get; set; }
        public DateTime? FollowUpDate { get; set; }
    }

    // Report DTOs
    public class ReportDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public ReportType Type { get; set; }
        public string TypeDisplay => Type.GetTypeDisplayName();
        public ReportStatus Status { get; set; }
        public string StatusDisplay => Status.GetStatusDisplayName();
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? GeneratedAt { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? FileFormat { get; set; }
        public bool IsScheduled { get; set; }
        public DateTime? NextScheduledRun { get; set; }
        public bool IsPublic { get; set; }
        public int ViewCount { get; set; }
        public int DownloadCount { get; set; }
        public int? AssociationId { get; set; }
        public string? AssociationName { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreateReportRequest
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public ReportType Type { get; set; } = ReportType.General;

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public Dictionary<string, object>? Filters { get; set; }

        [StringLength(100)]
        public string? FileFormat { get; set; } = "PDF";

        public bool IsScheduled { get; set; } = false;

        public Dictionary<string, object>? ScheduleSettings { get; set; }

        public bool IsPublic { get; set; } = false;

        public List<string>? Tags { get; set; }

        public int? AssociationId { get; set; }
    }

    // Partner DTOs
    public class PartnerDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public PartnerType Type { get; set; }
        public string TypeDisplay => Type.GetTypeDisplayName();
        public string Address { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string? ContactPerson { get; set; }
        public string? ContactPhone { get; set; }
        public string? ContactEmail { get; set; }
        public PartnerStatus Status { get; set; }
        public string StatusDisplay => Status.GetStatusDisplayName();
        public DateTime PartnershipDate { get; set; }
        public DateTime? LastContactDate { get; set; }
        public List<string>? Services { get; set; }
        public string? LogoPath { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreatePartnerRequest
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public PartnerType Type { get; set; } = PartnerType.Organization;

        [StringLength(500)]
        public string Address { get; set; } = string.Empty;

        [Phone]
        [StringLength(20)]
        public string? Phone { get; set; }

        [EmailAddress]
        [StringLength(100)]
        public string? Email { get; set; }

        [Url]
        [StringLength(200)]
        public string? Website { get; set; }

        [StringLength(100)]
        public string? ContactPerson { get; set; }

        [Phone]
        [StringLength(20)]
        public string? ContactPhone { get; set; }

        [EmailAddress]
        [StringLength(100)]
        public string? ContactEmail { get; set; }

        public DateTime PartnershipDate { get; set; } = DateTime.UtcNow;

        public List<string>? Services { get; set; }
    }

    public class UpdatePartnerRequest : CreatePartnerRequest
    {
        public PartnerStatus Status { get; set; }
        public DateTime? LastContactDate { get; set; }
    }

    // Statistics DTOs
    public class DashboardStatsDto
    {
        public int TotalAssociations { get; set; }
        public int ActiveAssociations { get; set; }
        public int TotalResidents { get; set; }
        public int VulnerableResidents { get; set; }
        public decimal TotalDonations { get; set; }
        public int DonationsThisMonth { get; set; }
        public int OpenAlerts { get; set; }
        public int HighPriorityAlerts { get; set; }
        public int PendingDeclarations { get; set; }
        public int ReportsGenerated { get; set; }
        public List<ChartDataDto> AssociationsByRegion { get; set; } = new();
        public List<ChartDataDto> DonationsByType { get; set; } = new();
        public List<ChartDataDto> AlertsByPriority { get; set; } = new();
        public List<TimeSeriesDataDto> MonthlyDonations { get; set; } = new();
        public List<TimeSeriesDataDto> MonthlyAlerts { get; set; } = new();
    }

    public class ChartDataDto
    {
        public string Label { get; set; } = string.Empty;
        public decimal Value { get; set; }
        public string? Color { get; set; }
    }

    public class TimeSeriesDataDto
    {
        public DateTime Date { get; set; }
        public decimal Value { get; set; }
        public string Label { get; set; } = string.Empty;
    }

    // Filter DTOs
    public class AssociationFilterDto : PaginationRequest
    {
        public string? Region { get; set; }
        public AssociationStatus? Status { get; set; }
        public string? Type { get; set; }
        public RiskLevel? RiskLevel { get; set; }
    }

    public class ResidentFilterDto : PaginationRequest
    {
        public string? Region { get; set; }
        public string? City { get; set; }
        public ResidentStatus? Status { get; set; }
        public bool? IsVulnerable { get; set; }
        public bool? HasDisability { get; set; }
        public int? AssociationId { get; set; }
    }

    public class DonationFilterDto : PaginationRequest
    {
        public DonationStatus? Status { get; set; }
        public DonationType? Type { get; set; }
        public DonationMethod? Method { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? AssociationId { get; set; }
        public decimal? MinAmount { get; set; }
        public decimal? MaxAmount { get; set; }
    }

    public class AlertFilterDto : PaginationRequest
    {
        public AlertStatus? Status { get; set; }
        public AlertType? Type { get; set; }
        public AlertPriority? Priority { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? AssignedToId { get; set; }
        public int? AssociationId { get; set; }
        public bool? IsOverdue { get; set; }
    }

    public class DeclarationFilterDto : PaginationRequest
    {
        public DeclarationStatus? Status { get; set; }
        public DeclarationType? Type { get; set; }
        public DeclarationPriority? Priority { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? RequiresFollowUp { get; set; }
        public int? AssociationId { get; set; }
    }
}
