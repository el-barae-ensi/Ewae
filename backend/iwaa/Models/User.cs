using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace iwaa.Models
{
    public class User : IdentityUser
    {
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        public UserRole Role { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public string? ProfileImageUrl { get; set; }

        public string? Department { get; set; }

        public string? Position { get; set; }

        // Navigation properties
        public virtual ICollection<Association> CreatedAssociations { get; set; } = new List<Association>();
        public virtual ICollection<Alert> CreatedAlerts { get; set; } = new List<Alert>();
        public virtual ICollection<Report> CreatedReports { get; set; } = new List<Report>();
        public virtual ICollection<Donation> ProcessedDonations { get; set; } = new List<Donation>();
    }

    public enum UserRole
    {
        AgentSecurite = 1,
        GroupeAssociatif = 2,
        Public = 3,
        GestionPersona = 4,
        Twaa = 5
    }

    public static class UserRoleExtensions
    {
        public static string GetDisplayName(this UserRole role)
        {
            return role switch
            {
                UserRole.AgentSecurite => "Agent de Sécurité National",
                UserRole.GroupeAssociatif => "Groupe Associatif",
                UserRole.Public => "Utilisateur Public",
                UserRole.GestionPersona => "Gestión Persona",
                UserRole.Twaa => "Administrateur Twaa",
                _ => role.ToString()
            };
        }

        public static List<string> GetPermissions(this UserRole role)
        {
            return role switch
            {
                UserRole.AgentSecurite => new List<string>
                {
                    "view_associations", "filter_associations", "view_residents",
                    "filter_residents", "contact_associations", "generate_notifications",
                    "generate_reports", "manage_alerts"
                },
                UserRole.GroupeAssociatif => new List<string>
                {
                    "manage_association_accounts", "validate_funding_requests",
                    "manage_complaints", "generate_activity_reports", "contact_associations"
                },
                UserRole.Public => new List<string>
                {
                    "add_declaration", "view_partners", "add_donation"
                },
                UserRole.GestionPersona => new List<string>
                {
                    "consult_person", "manage_residents", "search_residents", "manage_pensionarios"
                },
                UserRole.Twaa => new List<string>
                {
                    "manage_donations", "view_statistics", "manage_documents",
                    "consult_resources", "consult_agents", "manage_detainees",
                    "receive_notifications", "contact_province", "manage_police"
                },
                _ => new List<string>()
            };
        }
    }
}
