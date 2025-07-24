using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iwaa.Models
{
    public class Report
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public ReportType Type { get; set; } = ReportType.General;

        [Required]
        public ReportStatus Status { get; set; } = ReportStatus.Draft;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public DateTime? GeneratedAt { get; set; }

        [StringLength(450)]
        public string? CreatedById { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string? Filters { get; set; } // JSON string for applied filters

        public string? Data { get; set; } // JSON string for report data

        public string? FilePath { get; set; } // Path to generated file (PDF, Excel, etc.)

        [StringLength(100)]
        public string? FileFormat { get; set; } // PDF, Excel, CSV, etc.

        public bool IsScheduled { get; set; } = false;

        public string? ScheduleSettings { get; set; } // JSON for scheduling info

        public DateTime? NextScheduledRun { get; set; }

        public bool IsPublic { get; set; } = false;

        public string? Tags { get; set; } // JSON string for tags

        public int ViewCount { get; set; } = 0;

        public int DownloadCount { get; set; } = 0;

        // Foreign Keys
        public int? AssociationId { get; set; }

        public bool IsActive { get; set; } = true;

        // Navigation properties
        [ForeignKey("CreatedById")]
        public virtual User? CreatedBy { get; set; }

        [ForeignKey("AssociationId")]
        public virtual Association? Association { get; set; }

        public virtual ICollection<ReportParameter> Parameters { get; set; } = new List<ReportParameter>();
        public virtual ICollection<ReportShare> Shares { get; set; } = new List<ReportShare>();
    }

    public class ReportParameter
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ReportId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Type { get; set; } = string.Empty; // string, int, date, boolean, etc.

        public string? Value { get; set; }

        [StringLength(200)]
        public string? Label { get; set; }

        public bool IsRequired { get; set; } = false;

        public string? ValidationRules { get; set; } // JSON for validation

        // Navigation properties
        [ForeignKey("ReportId")]
        public virtual Report Report { get; set; } = null!;
    }

    public class ReportShare
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ReportId { get; set; }

        [Required]
        [StringLength(450)]
        public string SharedWithUserId { get; set; } = string.Empty;

        [Required]
        public SharePermission Permission { get; set; } = SharePermission.View;

        [Required]
        public DateTime SharedAt { get; set; } = DateTime.UtcNow;

        [StringLength(450)]
        public string? SharedById { get; set; }

        public DateTime? ExpiresAt { get; set; }

        public bool IsActive { get; set; } = true;

        // Navigation properties
        [ForeignKey("ReportId")]
        public virtual Report Report { get; set; } = null!;

        [ForeignKey("SharedWithUserId")]
        public virtual User SharedWithUser { get; set; } = null!;

        [ForeignKey("SharedById")]
        public virtual User? SharedBy { get; set; }
    }

    public class FundingRequest
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Reference { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal RequestedAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ApprovedAmount { get; set; }

        [Required]
        public FundingRequestStatus Status { get; set; } = FundingRequestStatus.Submitted;

        [Required]
        public FundingRequestType Type { get; set; } = FundingRequestType.Project;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ReviewedAt { get; set; }

        public DateTime? ApprovedAt { get; set; }

        [StringLength(450)]
        public string? ReviewedById { get; set; }

        public string? ReviewNotes { get; set; }

        public DateTime? ProjectStartDate { get; set; }

        public DateTime? ProjectEndDate { get; set; }

        [StringLength(200)]
        public string? ProjectLocation { get; set; }

        public int? BeneficiaryCount { get; set; }

        public string? Budget { get; set; } // JSON string for detailed budget

        // Foreign Keys
        [Required]
        public int AssociationId { get; set; }

        public bool IsActive { get; set; } = true;

        // Navigation properties
        [ForeignKey("AssociationId")]
        public virtual Association Association { get; set; } = null!;

        [ForeignKey("ReviewedById")]
        public virtual User? ReviewedBy { get; set; }

        public virtual ICollection<FundingRequestDocument> Documents { get; set; } = new List<FundingRequestDocument>();
    }

    public class FundingRequestDocument
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int FundingRequestId { get; set; }

        [Required]
        [StringLength(200)]
        public string FileName { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string FilePath { get; set; } = string.Empty;

        [StringLength(100)]
        public string? ContentType { get; set; }

        public long FileSize { get; set; }

        [StringLength(100)]
        public string DocumentType { get; set; } = string.Empty;

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

        [StringLength(450)]
        public string? UploadedById { get; set; }

        // Navigation properties
        [ForeignKey("FundingRequestId")]
        public virtual FundingRequest FundingRequest { get; set; } = null!;

        [ForeignKey("UploadedById")]
        public virtual User? UploadedBy { get; set; }
    }

    public class Complaint
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Reference { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string Subject { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public ComplaintType Type { get; set; } = ComplaintType.General;

        [Required]
        public ComplaintStatus Status { get; set; } = ComplaintStatus.Submitted;

        [Required]
        public ComplaintPriority Priority { get; set; } = ComplaintPriority.Normal;

        // Complainant Information
        [Required]
        [StringLength(100)]
        public string ComplainantName { get; set; } = string.Empty;

        [EmailAddress]
        [StringLength(100)]
        public string? ComplainantEmail { get; set; }

        [Phone]
        [StringLength(20)]
        public string? ComplainantPhone { get; set; }

        [StringLength(500)]
        public string? ComplainantAddress { get; set; }

        public bool IsAnonymous { get; set; } = false;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public DateTime? ResolvedAt { get; set; }

        [StringLength(450)]
        public string? AssignedToId { get; set; }

        [StringLength(450)]
        public string? ResolvedById { get; set; }

        public string? Resolution { get; set; }

        public string? InternalNotes { get; set; }

        // Foreign Keys
        public int? AssociationId { get; set; }

        public bool IsActive { get; set; } = true;

        public bool RequiresFollowUp { get; set; } = false;

        public DateTime? FollowUpDate { get; set; }

        // Navigation properties
        [ForeignKey("AssignedToId")]
        public virtual User? AssignedTo { get; set; }

        [ForeignKey("ResolvedById")]
        public virtual User? ResolvedBy { get; set; }

        [ForeignKey("AssociationId")]
        public virtual Association? Association { get; set; }

        public virtual ICollection<ComplaintDocument> Documents { get; set; } = new List<ComplaintDocument>();
    }

    public class ComplaintDocument
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ComplaintId { get; set; }

        [Required]
        [StringLength(200)]
        public string FileName { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string FilePath { get; set; } = string.Empty;

        [StringLength(100)]
        public string? ContentType { get; set; }

        public long FileSize { get; set; }

        [StringLength(100)]
        public string DocumentType { get; set; } = string.Empty;

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("ComplaintId")]
        public virtual Complaint Complaint { get; set; } = null!;
    }

    public class Partner
    {
        [Key]
        public int Id { get; set; }

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

        [Required]
        public PartnerStatus Status { get; set; } = PartnerStatus.Active;

        public DateTime PartnershipDate { get; set; } = DateTime.UtcNow;

        public DateTime? LastContactDate { get; set; }

        public string? Services { get; set; } // JSON string for services offered

        public string? LogoPath { get; set; }

        public string? Documents { get; set; } // JSON string for partnership documents

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        [StringLength(450)]
        public string? CreatedById { get; set; }

        public bool IsActive { get; set; } = true;

        // Navigation properties
        [ForeignKey("CreatedById")]
        public virtual User? CreatedBy { get; set; }
    }

    // Enums
    public enum ReportType
    {
        General = 1,
        Financial = 2,
        Statistical = 3,
        Compliance = 4,
        Activity = 5,
        Performance = 6,
        Security = 7,
        Audit = 8
    }

    public enum ReportStatus
    {
        Draft = 1,
        Generated = 2,
        Shared = 3,
        Archived = 4,
        Failed = 5
    }

    public enum SharePermission
    {
        View = 1,
        Download = 2,
        Edit = 3,
        FullAccess = 4
    }

    public enum FundingRequestStatus
    {
        Submitted = 1,
        UnderReview = 2,
        Approved = 3,
        Rejected = 4,
        PartiallyApproved = 5,
        Cancelled = 6,
        Completed = 7
    }

    public enum FundingRequestType
    {
        Project = 1,
        Emergency = 2,
        Equipment = 3,
        Training = 4,
        Event = 5,
        Infrastructure = 6,
        Other = 7
    }

    public enum ComplaintType
    {
        General = 1,
        Service = 2,
        Financial = 3,
        Discrimination = 4,
        Harassment = 5,
        Misconduct = 6,
        Facility = 7,
        Other = 8
    }

    public enum ComplaintStatus
    {
        Submitted = 1,
        UnderReview = 2,
        InProgress = 3,
        Resolved = 4,
        Closed = 5,
        Escalated = 6
    }

    public enum ComplaintPriority
    {
        Low = 1,
        Normal = 2,
        High = 3,
        Urgent = 4
    }

    public enum PartnerType
    {
        Organization = 1,
        Government = 2,
        NGO = 3,
        Business = 4,
        Educational = 5,
        Healthcare = 6,
        Religious = 7,
        International = 8
    }

    public enum PartnerStatus
    {
        Active = 1,
        Inactive = 2,
        Suspended = 3,
        Pending = 4,
        Terminated = 5
    }

    // Extension methods
    public static class ReportExtensions
    {
        public static string GetTypeDisplayName(this ReportType type)
        {
            return type switch
            {
                ReportType.General => "Général",
                ReportType.Financial => "Financier",
                ReportType.Statistical => "Statistique",
                ReportType.Compliance => "Conformité",
                ReportType.Activity => "Activité",
                ReportType.Performance => "Performance",
                ReportType.Security => "Sécurité",
                ReportType.Audit => "Audit",
                _ => type.ToString()
            };
        }

        public static string GetStatusDisplayName(this ReportStatus status)
        {
            return status switch
            {
                ReportStatus.Draft => "Brouillon",
                ReportStatus.Generated => "Généré",
                ReportStatus.Shared => "Partagé",
                ReportStatus.Archived => "Archivé",
                ReportStatus.Failed => "Échec",
                _ => status.ToString()
            };
        }
    }

    public static class FundingRequestExtensions
    {
        public static string GetStatusDisplayName(this FundingRequestStatus status)
        {
            return status switch
            {
                FundingRequestStatus.Submitted => "Soumis",
                FundingRequestStatus.UnderReview => "En révision",
                FundingRequestStatus.Approved => "Approuvé",
                FundingRequestStatus.Rejected => "Rejeté",
                FundingRequestStatus.PartiallyApproved => "Partiellement approuvé",
                FundingRequestStatus.Cancelled => "Annulé",
                FundingRequestStatus.Completed => "Terminé",
                _ => status.ToString()
            };
        }

        public static string GetTypeDisplayName(this FundingRequestType type)
        {
            return type switch
            {
                FundingRequestType.Project => "Projet",
                FundingRequestType.Emergency => "Urgence",
                FundingRequestType.Equipment => "Équipement",
                FundingRequestType.Training => "Formation",
                FundingRequestType.Event => "Événement",
                FundingRequestType.Infrastructure => "Infrastructure",
                FundingRequestType.Other => "Autre",
                _ => type.ToString()
            };
        }
    }

    public static class ComplaintExtensions
    {
        public static string GetTypeDisplayName(this ComplaintType type)
        {
            return type switch
            {
                ComplaintType.General => "Général",
                ComplaintType.Service => "Service",
                ComplaintType.Financial => "Financier",
                ComplaintType.Discrimination => "Discrimination",
                ComplaintType.Harassment => "Harcèlement",
                ComplaintType.Misconduct => "Inconduite",
                ComplaintType.Facility => "Installation",
                ComplaintType.Other => "Autre",
                _ => type.ToString()
            };
        }

        public static string GetStatusDisplayName(this ComplaintStatus status)
        {
            return status switch
            {
                ComplaintStatus.Submitted => "Soumis",
                ComplaintStatus.UnderReview => "En révision",
                ComplaintStatus.InProgress => "En cours",
                ComplaintStatus.Resolved => "Résolu",
                ComplaintStatus.Closed => "Fermé",
                ComplaintStatus.Escalated => "Escaladé",
                _ => status.ToString()
            };
        }
    }

    public static class PartnerExtensions
    {
        public static string GetTypeDisplayName(this PartnerType type)
        {
            return type switch
            {
                PartnerType.Organization => "Organisation",
                PartnerType.Government => "Gouvernement",
                PartnerType.NGO => "ONG",
                PartnerType.Business => "Entreprise",
                PartnerType.Educational => "Éducatif",
                PartnerType.Healthcare => "Santé",
                PartnerType.Religious => "Religieux",
                PartnerType.International => "International",
                _ => type.ToString()
            };
        }

        public static string GetStatusDisplayName(this PartnerStatus status)
        {
            return status switch
            {
                PartnerStatus.Active => "Actif",
                PartnerStatus.Inactive => "Inactif",
                PartnerStatus.Suspended => "Suspendu",
                PartnerStatus.Pending => "En attente",
                PartnerStatus.Terminated => "Terminé",
                _ => status.ToString()
            };
        }
    }
}
