using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iwaa.Models
{
    public class Alert
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public AlertType Type { get; set; } = AlertType.General;

        [Required]
        public AlertPriority Priority { get; set; } = AlertPriority.Medium;

        [Required]
        public AlertStatus Status { get; set; } = AlertStatus.Open;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public DateTime? ResolvedAt { get; set; }

        [StringLength(450)]
        public string? CreatedById { get; set; }

        [StringLength(450)]
        public string? AssignedToId { get; set; }

        [StringLength(450)]
        public string? ResolvedById { get; set; }

        public string? Resolution { get; set; }

        public string? Evidence { get; set; } // JSON string for evidence files

        [StringLength(500)]
        public string? Location { get; set; }

        public DateTime? IncidentDate { get; set; }

        // Foreign Keys
        public int? AssociationId { get; set; }
        public int? ResidentId { get; set; }

        public bool IsActive { get; set; } = true;

        public string? Tags { get; set; } // JSON string for tags

        public int ViewCount { get; set; } = 0;

        // Navigation properties
        [ForeignKey("CreatedById")]
        public virtual User? CreatedBy { get; set; }

        [ForeignKey("AssignedToId")]
        public virtual User? AssignedTo { get; set; }

        [ForeignKey("ResolvedById")]
        public virtual User? ResolvedBy { get; set; }

        [ForeignKey("AssociationId")]
        public virtual Association? Association { get; set; }

        [ForeignKey("ResidentId")]
        public virtual Resident? Resident { get; set; }

        public virtual ICollection<AlertComment> Comments { get; set; } = new List<AlertComment>();
        public virtual ICollection<AlertDocument> Documents { get; set; } = new List<AlertDocument>();

        // Computed properties
        [NotMapped]
        public TimeSpan? Duration => ResolvedAt.HasValue ? ResolvedAt.Value - CreatedAt : null;

        [NotMapped]
        public bool IsOverdue => Priority == AlertPriority.High && CreatedAt.AddHours(24) < DateTime.UtcNow && Status != AlertStatus.Resolved;
    }

    public class AlertComment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int AlertId { get; set; }

        [Required]
        public string Content { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [StringLength(450)]
        public string? CreatedById { get; set; }

        public bool IsInternal { get; set; } = false;

        // Navigation properties
        [ForeignKey("AlertId")]
        public virtual Alert Alert { get; set; } = null!;

        [ForeignKey("CreatedById")]
        public virtual User? CreatedBy { get; set; }
    }

    public class AlertDocument
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int AlertId { get; set; }

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
        [ForeignKey("AlertId")]
        public virtual Alert Alert { get; set; } = null!;

        [ForeignKey("UploadedById")]
        public virtual User? UploadedBy { get; set; }
    }

    public class Declaration
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
        public DeclarationType Type { get; set; } = DeclarationType.General;

        [Required]
        public DeclarationStatus Status { get; set; } = DeclarationStatus.Submitted;

        [Required]
        public DeclarationPriority Priority { get; set; } = DeclarationPriority.Normal;

        // Declarant Information
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

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public DateTime? ProcessedAt { get; set; }

        [StringLength(450)]
        public string? ProcessedById { get; set; }

        public string? ProcessingNotes { get; set; }

        [StringLength(500)]
        public string? IncidentLocation { get; set; }

        public DateTime? IncidentDate { get; set; }

        // Foreign Keys
        public int? AssociationId { get; set; }
        public int? ResidentId { get; set; }

        public bool IsActive { get; set; } = true;

        public bool RequiresFollowUp { get; set; } = false;

        public DateTime? FollowUpDate { get; set; }

        // Navigation properties
        [ForeignKey("ProcessedById")]
        public virtual User? ProcessedBy { get; set; }

        [ForeignKey("AssociationId")]
        public virtual Association? RelatedAssociation { get; set; }

        [ForeignKey("ResidentId")]
        public virtual Resident? RelatedResident { get; set; }

        public virtual ICollection<DeclarationDocument> Documents { get; set; } = new List<DeclarationDocument>();
    }

    public class DeclarationDocument
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DeclarationId { get; set; }

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
        [ForeignKey("DeclarationId")]
        public virtual Declaration Declaration { get; set; } = null!;
    }

    // Enums
    public enum AlertType
    {
        General = 1,
        Security = 2,
        Financial = 3,
        Legal = 4,
        Operational = 5,
        Emergency = 6,
        Compliance = 7,
        Safety = 8
    }

    public enum AlertPriority
    {
        Low = 1,
        Medium = 2,
        High = 3,
        Critical = 4,
        Emergency = 5
    }

    public enum AlertStatus
    {
        Open = 1,
        InProgress = 2,
        Resolved = 3,
        Closed = 4,
        Cancelled = 5
    }

    public enum DeclarationType
    {
        General = 1,
        Complaint = 2,
        Emergency = 3,
        Incident = 4,
        Request = 5,
        Information = 6,
        Suggestion = 7
    }

    public enum DeclarationStatus
    {
        Submitted = 1,
        UnderReview = 2,
        InProgress = 3,
        Resolved = 4,
        Closed = 5,
        Rejected = 6
    }

    public enum DeclarationPriority
    {
        Low = 1,
        Normal = 2,
        High = 3,
        Urgent = 4
    }

    // Extension methods
    public static class AlertExtensions
    {
        public static string GetTypeDisplayName(this AlertType type)
        {
            return type switch
            {
                AlertType.General => "Général",
                AlertType.Security => "Sécurité",
                AlertType.Financial => "Financier",
                AlertType.Legal => "Juridique",
                AlertType.Operational => "Opérationnel",
                AlertType.Emergency => "Urgence",
                AlertType.Compliance => "Conformité",
                AlertType.Safety => "Sécurité",
                _ => type.ToString()
            };
        }

        public static string GetPriorityDisplayName(this AlertPriority priority)
        {
            return priority switch
            {
                AlertPriority.Low => "Faible",
                AlertPriority.Medium => "Moyen",
                AlertPriority.High => "Élevé",
                AlertPriority.Critical => "Critique",
                AlertPriority.Emergency => "Urgence",
                _ => priority.ToString()
            };
        }

        public static string GetStatusDisplayName(this AlertStatus status)
        {
            return status switch
            {
                AlertStatus.Open => "Ouvert",
                AlertStatus.InProgress => "En cours",
                AlertStatus.Resolved => "Résolu",
                AlertStatus.Closed => "Fermé",
                AlertStatus.Cancelled => "Annulé",
                _ => status.ToString()
            };
        }

        public static string GetPriorityColor(this AlertPriority priority)
        {
            return priority switch
            {
                AlertPriority.Low => "success",
                AlertPriority.Medium => "warning",
                AlertPriority.High => "danger",
                AlertPriority.Critical => "dark",
                AlertPriority.Emergency => "danger",
                _ => "secondary"
            };
        }
    }

    public static class DeclarationExtensions
    {
        public static string GetTypeDisplayName(this DeclarationType type)
        {
            return type switch
            {
                DeclarationType.General => "Général",
                DeclarationType.Complaint => "Plainte",
                DeclarationType.Emergency => "Urgence",
                DeclarationType.Incident => "Incident",
                DeclarationType.Request => "Demande",
                DeclarationType.Information => "Information",
                DeclarationType.Suggestion => "Suggestion",
                _ => type.ToString()
            };
        }

        public static string GetStatusDisplayName(this DeclarationStatus status)
        {
            return status switch
            {
                DeclarationStatus.Submitted => "Soumis",
                DeclarationStatus.UnderReview => "En révision",
                DeclarationStatus.InProgress => "En cours",
                DeclarationStatus.Resolved => "Résolu",
                DeclarationStatus.Closed => "Fermé",
                DeclarationStatus.Rejected => "Rejeté",
                _ => status.ToString()
            };
        }

        public static string GetPriorityDisplayName(this DeclarationPriority priority)
        {
            return priority switch
            {
                DeclarationPriority.Low => "Faible",
                DeclarationPriority.Normal => "Normal",
                DeclarationPriority.High => "Élevé",
                DeclarationPriority.Urgent => "Urgent",
                _ => priority.ToString()
            };
        }
    }
}
