using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iwaa.Models
{
    public class Donation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Reference { get; set; } = string.Empty;

        [StringLength(100)]
        public string? DonorName { get; set; }

        [EmailAddress]
        [StringLength(100)]
        public string? DonorEmail { get; set; }

        [Phone]
        [StringLength(20)]
        public string? DonorPhone { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        [StringLength(10)]
        public string Currency { get; set; } = "MAD";

        [Required]
        public DonationType Type { get; set; } = DonationType.Monetary;

        [Required]
        public DonationStatus Status { get; set; } = DonationStatus.Pending;

        [Required]
        public DateTime Date { get; set; } = DateTime.UtcNow;

        [Required]
        public DonationMethod Method { get; set; } = DonationMethod.BankTransfer;

        [StringLength(200)]
        public string Purpose { get; set; } = string.Empty;

        public bool IsAnonymous { get; set; } = false;

        public string? Notes { get; set; }

        public bool ReceiptSent { get; set; } = false;

        public bool TaxDeductible { get; set; } = false;

        public DateTime? ProcessedDate { get; set; }

        [StringLength(450)]
        public string? ProcessedById { get; set; }

        [StringLength(500)]
        public string? MaterialDescription { get; set; }

        public string? AttachmentPath { get; set; }

        // Foreign Keys
        public int? AssociationId { get; set; }

        public int? CampaignId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public bool IsActive { get; set; } = true;

        // Navigation properties
        [ForeignKey("AssociationId")]
        public virtual Association? TargetAssociation { get; set; }

        [ForeignKey("ProcessedById")]
        public virtual User? ProcessedBy { get; set; }

        [ForeignKey("CampaignId")]
        public virtual DonationCampaign? Campaign { get; set; }

        public virtual ICollection<DonationDocument> Documents { get; set; } = new List<DonationDocument>();
    }

    public class DonationCampaign
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal TargetAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal CurrentAmount { get; set; } = 0;

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [Required]
        public CampaignStatus Status { get; set; } = CampaignStatus.Active;

        public int? AssociationId { get; set; }

        [StringLength(450)]
        public string? CreatedById { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsActive { get; set; } = true;

        // Navigation properties
        [ForeignKey("AssociationId")]
        public virtual Association? Association { get; set; }

        [ForeignKey("CreatedById")]
        public virtual User? CreatedBy { get; set; }

        public virtual ICollection<Donation> Donations { get; set; } = new List<Donation>();

        // Computed properties
        [NotMapped]
        public decimal ProgressPercentage => TargetAmount > 0 ? (CurrentAmount / TargetAmount) * 100 : 0;
    }

    public class DonationDocument
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DonationId { get; set; }

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
        [ForeignKey("DonationId")]
        public virtual Donation Donation { get; set; } = null!;

        [ForeignKey("UploadedById")]
        public virtual User? UploadedBy { get; set; }
    }

    public enum DonationType
    {
        Monetary = 1,
        Material = 2,
        Service = 3,
        Blood = 4,
        Other = 5
    }

    public enum DonationStatus
    {
        Pending = 1,
        Processing = 2,
        Completed = 3,
        Failed = 4,
        Cancelled = 5,
        Refunded = 6
    }

    public enum DonationMethod
    {
        BankTransfer = 1,
        CreditCard = 2,
        Cash = 3,
        Check = 4,
        MobilePayment = 5,
        InKind = 6,
        Online = 7
    }

    public enum CampaignStatus
    {
        Draft = 1,
        Active = 2,
        Completed = 3,
        Cancelled = 4,
        Paused = 5
    }

    public static class DonationTypeExtensions
    {
        public static string GetDisplayName(this DonationType type)
        {
            return type switch
            {
                DonationType.Monetary => "Monétaire",
                DonationType.Material => "Matériel",
                DonationType.Service => "Service",
                DonationType.Blood => "Don du sang",
                DonationType.Other => "Autre",
                _ => type.ToString()
            };
        }
    }

    public static class DonationStatusExtensions
    {
        public static string GetDisplayName(this DonationStatus status)
        {
            return status switch
            {
                DonationStatus.Pending => "En attente",
                DonationStatus.Processing => "En cours",
                DonationStatus.Completed => "Terminé",
                DonationStatus.Failed => "Échec",
                DonationStatus.Cancelled => "Annulé",
                DonationStatus.Refunded => "Remboursé",
                _ => status.ToString()
            };
        }

        public static string GetColor(this DonationStatus status)
        {
            return status switch
            {
                DonationStatus.Pending => "warning",
                DonationStatus.Processing => "info",
                DonationStatus.Completed => "success",
                DonationStatus.Failed => "danger",
                DonationStatus.Cancelled => "secondary",
                DonationStatus.Refunded => "dark",
                _ => "light"
            };
        }
    }

    public static class DonationMethodExtensions
    {
        public static string GetDisplayName(this DonationMethod method)
        {
            return method switch
            {
                DonationMethod.BankTransfer => "Virement bancaire",
                DonationMethod.CreditCard => "Carte de crédit",
                DonationMethod.Cash => "Espèces",
                DonationMethod.Check => "Chèque",
                DonationMethod.MobilePayment => "Paiement mobile",
                DonationMethod.InKind => "En nature",
                DonationMethod.Online => "En ligne",
                _ => method.ToString()
            };
        }
    }
}
