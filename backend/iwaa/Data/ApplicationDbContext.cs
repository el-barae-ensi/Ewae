using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using iwaa.Models;

namespace iwaa.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets for all entities
        public DbSet<Association> Associations { get; set; }
        public DbSet<Resident> Residents { get; set; }
        public DbSet<ResidentService> ResidentServices { get; set; }
        public DbSet<Donation> Donations { get; set; }
        public DbSet<DonationCampaign> DonationCampaigns { get; set; }
        public DbSet<DonationDocument> DonationDocuments { get; set; }
        public DbSet<Alert> Alerts { get; set; }
        public DbSet<AlertComment> AlertComments { get; set; }
        public DbSet<AlertDocument> AlertDocuments { get; set; }
        public DbSet<Declaration> Declarations { get; set; }
        public DbSet<DeclarationDocument> DeclarationDocuments { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<ReportParameter> ReportParameters { get; set; }
        public DbSet<ReportShare> ReportShares { get; set; }
        public DbSet<FundingRequest> FundingRequests { get; set; }
        public DbSet<FundingRequestDocument> FundingRequestDocuments { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<ComplaintDocument> ComplaintDocuments { get; set; }
        public DbSet<Partner> Partners { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure User entity
            builder.Entity<User>(entity =>
            {
                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasConversion<int>();

                entity.HasIndex(e => e.Email)
                    .IsUnique();

                entity.HasIndex(e => e.UserName)
                    .IsUnique();
            });

            // Configure Association entity
            builder.Entity<Association>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Budget)
                    .HasColumnType("decimal(18,2)");

                entity.Property(e => e.Status)
                    .HasConversion<int>();

                entity.Property(e => e.RiskLevel)
                    .HasConversion<int>();

                entity.HasOne(e => e.CreatedBy)
                    .WithMany(u => u.CreatedAssociations)
                    .HasForeignKey(e => e.CreatedById)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasIndex(e => e.Name);
                entity.HasIndex(e => e.Region);
                entity.HasIndex(e => e.Status);
            });

            // Configure Resident entity
            builder.Entity<Resident>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Status)
                    .HasConversion<int>();

                entity.Property(e => e.MonthlyIncome)
                    .HasColumnType("decimal(18,2)");

                entity.Property(e => e.GovernmentAidAmount)
                    .HasColumnType("decimal(18,2)");

                entity.HasOne(e => e.RegisteredBy)
                    .WithMany()
                    .HasForeignKey(e => e.RegisteredById)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.Association)
                    .WithMany(a => a.Residents)
                    .HasForeignKey(e => e.AssociationId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasIndex(e => e.NationalId)
                    .IsUnique();
                entity.HasIndex(e => new { e.FirstName, e.LastName });
                entity.HasIndex(e => e.Status);
            });

            // Configure ResidentService entity
            builder.Entity<ResidentService>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Status)
                    .HasConversion<int>();

                entity.HasOne(e => e.Resident)
                    .WithMany(r => r.Services)
                    .HasForeignKey(e => e.ResidentId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.ProvidedBy)
                    .WithMany()
                    .HasForeignKey(e => e.ProvidedById)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            // Configure Donation entity
            builder.Entity<Donation>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Amount)
                    .HasColumnType("decimal(18,2)");

                entity.Property(e => e.Type)
                    .HasConversion<int>();

                entity.Property(e => e.Status)
                    .HasConversion<int>();

                entity.Property(e => e.Method)
                    .HasConversion<int>();

                entity.HasOne(e => e.TargetAssociation)
                    .WithMany(a => a.Donations)
                    .HasForeignKey(e => e.AssociationId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.ProcessedBy)
                    .WithMany(u => u.ProcessedDonations)
                    .HasForeignKey(e => e.ProcessedById)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasIndex(e => e.Reference)
                    .IsUnique();
                entity.HasIndex(e => e.Status);
                entity.HasIndex(e => e.Date);
            });

            // Configure DonationCampaign entity
            builder.Entity<DonationCampaign>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.TargetAmount)
                    .HasColumnType("decimal(18,2)");

                entity.Property(e => e.CurrentAmount)
                    .HasColumnType("decimal(18,2)");

                entity.Property(e => e.Status)
                    .HasConversion<int>();

                entity.HasOne(e => e.Association)
                    .WithMany()
                    .HasForeignKey(e => e.AssociationId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.CreatedBy)
                    .WithMany()
                    .HasForeignKey(e => e.CreatedById)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            // Configure Alert entity
            builder.Entity<Alert>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Type)
                    .HasConversion<int>();

                entity.Property(e => e.Priority)
                    .HasConversion<int>();

                entity.Property(e => e.Status)
                    .HasConversion<int>();

                entity.HasOne(e => e.CreatedBy)
                    .WithMany(u => u.CreatedAlerts)
                    .HasForeignKey(e => e.CreatedById)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.AssignedTo)
                    .WithMany()
                    .HasForeignKey(e => e.AssignedToId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.ResolvedBy)
                    .WithMany()
                    .HasForeignKey(e => e.ResolvedById)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.Association)
                    .WithMany(a => a.Alerts)
                    .HasForeignKey(e => e.AssociationId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.Resident)
                    .WithMany(r => r.Alerts)
                    .HasForeignKey(e => e.ResidentId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasIndex(e => e.Status);
                entity.HasIndex(e => e.Priority);
                entity.HasIndex(e => e.CreatedAt);
            });

            // Configure Declaration entity
            builder.Entity<Declaration>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Type)
                    .HasConversion<int>();

                entity.Property(e => e.Status)
                    .HasConversion<int>();

                entity.Property(e => e.Priority)
                    .HasConversion<int>();

                entity.HasOne(e => e.ProcessedBy)
                    .WithMany()
                    .HasForeignKey(e => e.ProcessedById)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.RelatedAssociation)
                    .WithMany()
                    .HasForeignKey(e => e.AssociationId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.RelatedResident)
                    .WithMany(r => r.Declarations)
                    .HasForeignKey(e => e.ResidentId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasIndex(e => e.Reference)
                    .IsUnique();
                entity.HasIndex(e => e.Status);
                entity.HasIndex(e => e.CreatedAt);
            });

            // Configure Report entity
            builder.Entity<Report>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Type)
                    .HasConversion<int>();

                entity.Property(e => e.Status)
                    .HasConversion<int>();

                entity.HasOne(e => e.CreatedBy)
                    .WithMany(u => u.CreatedReports)
                    .HasForeignKey(e => e.CreatedById)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.Association)
                    .WithMany(a => a.Reports)
                    .HasForeignKey(e => e.AssociationId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasIndex(e => e.Type);
                entity.HasIndex(e => e.Status);
                entity.HasIndex(e => e.CreatedAt);
            });

            // Configure FundingRequest entity
            builder.Entity<FundingRequest>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.RequestedAmount)
                    .HasColumnType("decimal(18,2)");

                entity.Property(e => e.ApprovedAmount)
                    .HasColumnType("decimal(18,2)");

                entity.Property(e => e.Status)
                    .HasConversion<int>();

                entity.Property(e => e.Type)
                    .HasConversion<int>();

                entity.HasOne(e => e.Association)
                    .WithMany(a => a.FundingRequests)
                    .HasForeignKey(e => e.AssociationId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.ReviewedBy)
                    .WithMany()
                    .HasForeignKey(e => e.ReviewedById)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasIndex(e => e.Reference)
                    .IsUnique();
                entity.HasIndex(e => e.Status);
            });

            // Configure Complaint entity
            builder.Entity<Complaint>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Type)
                    .HasConversion<int>();

                entity.Property(e => e.Status)
                    .HasConversion<int>();

                entity.Property(e => e.Priority)
                    .HasConversion<int>();

                entity.HasOne(e => e.AssignedTo)
                    .WithMany()
                    .HasForeignKey(e => e.AssignedToId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.ResolvedBy)
                    .WithMany()
                    .HasForeignKey(e => e.ResolvedById)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(e => e.Association)
                    .WithMany(a => a.Complaints)
                    .HasForeignKey(e => e.AssociationId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasIndex(e => e.Reference)
                    .IsUnique();
                entity.HasIndex(e => e.Status);
            });

            // Configure Partner entity
            builder.Entity<Partner>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Type)
                    .HasConversion<int>();

                entity.Property(e => e.Status)
                    .HasConversion<int>();

                entity.HasOne(e => e.CreatedBy)
                    .WithMany()
                    .HasForeignKey(e => e.CreatedById)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasIndex(e => e.Name);
                entity.HasIndex(e => e.Type);
                entity.HasIndex(e => e.Status);
            });

            // Configure document entities
            ConfigureDocumentEntities(builder);

            // Configure additional relationships and constraints
            ConfigureAdditionalConstraints(builder);
        }

        private void ConfigureDocumentEntities(ModelBuilder builder)
        {
            // DonationDocument
            builder.Entity<DonationDocument>(entity =>
            {
                entity.HasOne(e => e.Donation)
                    .WithMany(d => d.Documents)
                    .HasForeignKey(e => e.DonationId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // AlertDocument
            builder.Entity<AlertDocument>(entity =>
            {
                entity.HasOne(e => e.Alert)
                    .WithMany(a => a.Documents)
                    .HasForeignKey(e => e.AlertId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // DeclarationDocument
            builder.Entity<DeclarationDocument>(entity =>
            {
                entity.HasOne(e => e.Declaration)
                    .WithMany(d => d.Documents)
                    .HasForeignKey(e => e.DeclarationId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // FundingRequestDocument
            builder.Entity<FundingRequestDocument>(entity =>
            {
                entity.HasOne(e => e.FundingRequest)
                    .WithMany(f => f.Documents)
                    .HasForeignKey(e => e.FundingRequestId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // ComplaintDocument
            builder.Entity<ComplaintDocument>(entity =>
            {
                entity.HasOne(e => e.Complaint)
                    .WithMany(c => c.Documents)
                    .HasForeignKey(e => e.ComplaintId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // AlertComment
            builder.Entity<AlertComment>(entity =>
            {
                entity.HasOne(e => e.Alert)
                    .WithMany(a => a.Comments)
                    .HasForeignKey(e => e.AlertId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // ReportParameter
            builder.Entity<ReportParameter>(entity =>
            {
                entity.HasOne(e => e.Report)
                    .WithMany(r => r.Parameters)
                    .HasForeignKey(e => e.ReportId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // ReportShare
            builder.Entity<ReportShare>(entity =>
            {
                entity.HasOne(e => e.Report)
                    .WithMany(r => r.Shares)
                    .HasForeignKey(e => e.ReportId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.SharedWithUser)
                    .WithMany()
                    .HasForeignKey(e => e.SharedWithUserId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.Property(e => e.Permission)
                    .HasConversion<int>();
            });
        }

        private void ConfigureAdditionalConstraints(ModelBuilder builder)
        {
            // Ensure email uniqueness where not null
            builder.Entity<Resident>()
                .HasIndex(e => e.Email)
                .IsUnique()
                .HasFilter("[Email] IS NOT NULL");

            // Ensure phone uniqueness where not null
            builder.Entity<Resident>()
                .HasIndex(e => e.Phone)
                .IsUnique()
                .HasFilter("[Phone] IS NOT NULL");

            // Check constraints removed to avoid warnings - validation handled at application level

            // Add default values for CreatedAt fields
            builder.Entity<Association>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("UTC_TIMESTAMP()");

            builder.Entity<Resident>()
                .Property(e => e.RegistrationDate)
                .HasDefaultValueSql("UTC_TIMESTAMP()");

            builder.Entity<Donation>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("UTC_TIMESTAMP()");

            builder.Entity<Alert>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("UTC_TIMESTAMP()");

            builder.Entity<Declaration>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("UTC_TIMESTAMP()");

            builder.Entity<Report>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("UTC_TIMESTAMP()");

            builder.Entity<FundingRequest>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("UTC_TIMESTAMP()");

            builder.Entity<Complaint>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("UTC_TIMESTAMP()");

            builder.Entity<Partner>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("UTC_TIMESTAMP()");
        }

        public override int SaveChanges()
        {
            UpdateTimestamps();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateTimestamps();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateTimestamps()
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                if (entry.Entity.GetType().GetProperty("UpdatedAt") != null)
                {
                    entry.Property("UpdatedAt").CurrentValue = DateTime.UtcNow;
                }

                if (entry.Entity.GetType().GetProperty("LastUpdated") != null)
                {
                    entry.Property("LastUpdated").CurrentValue = DateTime.UtcNow;
                }
            }
        }
    }
}
