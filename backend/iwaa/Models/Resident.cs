using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iwaa.Models
{
    public class Resident
    {
        [Key]
        public int Id { get; set; }

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
        public ResidentStatus Status { get; set; } = ResidentStatus.Active;

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

        [Column(TypeName = "decimal(18,2)")]
        public decimal? MonthlyIncome { get; set; }

        public string? MedicalConditions { get; set; }

        public string? SpecialNeeds { get; set; }

        public bool IsVulnerable { get; set; } = false;

        [StringLength(200)]
        public string? VulnerabilityReason { get; set; }

        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;

        public DateTime? LastUpdated { get; set; }

        [StringLength(450)]
        public string? RegisteredById { get; set; }

        public string? Notes { get; set; }

        public string? DocumentsPath { get; set; } // Path to uploaded documents

        public bool HasDisability { get; set; } = false;

        [StringLength(200)]
        public string? DisabilityType { get; set; }

        public bool ReceivesGovernmentAid { get; set; } = false;

        [StringLength(200)]
        public string? GovernmentAidType { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? GovernmentAidAmount { get; set; }

        public bool IsActive { get; set; } = true;

        // Foreign Keys
        public int? AssociationId { get; set; }

        // Navigation properties
        [ForeignKey("RegisteredById")]
        public virtual User? RegisteredBy { get; set; }

        [ForeignKey("AssociationId")]
        public virtual Association? Association { get; set; }

        public virtual ICollection<Declaration> Declarations { get; set; } = new List<Declaration>();
        public virtual ICollection<Alert> Alerts { get; set; } = new List<Alert>();
        public virtual ICollection<ResidentService> Services { get; set; } = new List<ResidentService>();

        // Computed properties
        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";

        [NotMapped]
        public int? Age
        {
            get
            {
                if (DateOfBirth.HasValue)
                {
                    var today = DateTime.Today;
                    var age = today.Year - DateOfBirth.Value.Year;
                    if (DateOfBirth.Value.Date > today.AddYears(-age)) age--;
                    return age;
                }
                return null;
            }
        }
    }

    public class ResidentService
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ResidentId { get; set; }

        [Required]
        [StringLength(100)]
        public string ServiceType { get; set; } = string.Empty;

        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        public DateTime ServiceDate { get; set; } = DateTime.UtcNow;

        [StringLength(450)]
        public string? ProvidedById { get; set; }

        public ServiceStatus Status { get; set; } = ServiceStatus.Completed;

        public string? Notes { get; set; }

        // Navigation properties
        [ForeignKey("ResidentId")]
        public virtual Resident Resident { get; set; } = null!;

        [ForeignKey("ProvidedById")]
        public virtual User? ProvidedBy { get; set; }
    }

    public enum ResidentStatus
    {
        Active = 1,
        Inactive = 2,
        Relocated = 3,
        Deceased = 4,
        UnderReview = 5
    }

    public enum ServiceStatus
    {
        Pending = 1,
        InProgress = 2,
        Completed = 3,
        Cancelled = 4
    }

    public static class ResidentStatusExtensions
    {
        public static string GetDisplayName(this ResidentStatus status)
        {
            return status switch
            {
                ResidentStatus.Active => "Actif",
                ResidentStatus.Inactive => "Inactif",
                ResidentStatus.Relocated => "Déménagé",
                ResidentStatus.Deceased => "Décédé",
                ResidentStatus.UnderReview => "En révision",
                _ => status.ToString()
            };
        }

        public static string GetColor(this ResidentStatus status)
        {
            return status switch
            {
                ResidentStatus.Active => "success",
                ResidentStatus.Inactive => "warning",
                ResidentStatus.Relocated => "info",
                ResidentStatus.Deceased => "dark",
                ResidentStatus.UnderReview => "secondary",
                _ => "light"
            };
        }
    }

    public static class ServiceStatusExtensions
    {
        public static string GetDisplayName(this ServiceStatus status)
        {
            return status switch
            {
                ServiceStatus.Pending => "En attente",
                ServiceStatus.InProgress => "En cours",
                ServiceStatus.Completed => "Terminé",
                ServiceStatus.Cancelled => "Annulé",
                _ => status.ToString()
            };
        }
    }
}
