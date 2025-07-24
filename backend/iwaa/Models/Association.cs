using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iwaa.Models
{
    public class Association
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Type { get; set; } = string.Empty;

        [Required]
        public AssociationStatus Status { get; set; } = AssociationStatus.Active;

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

        [Column(TypeName = "decimal(18,2)")]
        public decimal Budget { get; set; }

        public string? Projects { get; set; } // JSON string for array of projects

        public DateTime? LastInspection { get; set; }

        [StringLength(200)]
        public string? InspectionStatus { get; set; }

        [Required]
        public RiskLevel RiskLevel { get; set; } = RiskLevel.Low;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        [StringLength(450)]
        public string? CreatedById { get; set; }

        public string? Notes { get; set; }

        public string? LegalRegistrationNumber { get; set; }

        public DateTime? LegalRegistrationDate { get; set; }

        public string? BankAccountNumber { get; set; }

        public string? WebsiteUrl { get; set; }

        public string? SocialMediaLinks { get; set; } // JSON string

        public bool IsActive { get; set; } = true;

        // Navigation properties
        [ForeignKey("CreatedById")]
        public virtual User? CreatedBy { get; set; }

        public virtual ICollection<Resident> Residents { get; set; } = new List<Resident>();
        public virtual ICollection<Donation> Donations { get; set; } = new List<Donation>();
        public virtual ICollection<Alert> Alerts { get; set; } = new List<Alert>();
        public virtual ICollection<Report> Reports { get; set; } = new List<Report>();
        public virtual ICollection<FundingRequest> FundingRequests { get; set; } = new List<FundingRequest>();
        public virtual ICollection<Complaint> Complaints { get; set; } = new List<Complaint>();
    }

    public enum AssociationStatus
    {
        Active = 1,
        UnderReview = 2,
        Suspended = 3,
        Inactive = 4,
        Dissolved = 5
    }

    public enum RiskLevel
    {
        Low = 1,
        Medium = 2,
        High = 3,
        Critical = 4
    }

    public static class AssociationStatusExtensions
    {
        public static string GetDisplayName(this AssociationStatus status)
        {
            return status switch
            {
                AssociationStatus.Active => "Active",
                AssociationStatus.UnderReview => "En révision",
                AssociationStatus.Suspended => "Suspendue",
                AssociationStatus.Inactive => "Inactive",
                AssociationStatus.Dissolved => "Dissoute",
                _ => status.ToString()
            };
        }
    }

    public static class RiskLevelExtensions
    {
        public static string GetDisplayName(this RiskLevel risk)
        {
            return risk switch
            {
                RiskLevel.Low => "Faible",
                RiskLevel.Medium => "Moyen",
                RiskLevel.High => "Élevé",
                RiskLevel.Critical => "Critique",
                _ => risk.ToString()
            };
        }

        public static string GetColor(this RiskLevel risk)
        {
            return risk switch
            {
                RiskLevel.Low => "success",
                RiskLevel.Medium => "warning",
                RiskLevel.High => "danger",
                RiskLevel.Critical => "dark",
                _ => "secondary"
            };
        }
    }
}
