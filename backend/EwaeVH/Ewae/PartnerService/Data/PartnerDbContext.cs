using Microsoft.EntityFrameworkCore;
using PartnerService.Model;

namespace PartnerService.Data
{
    // Data/PartnerDbContext.cs
    public class PartnerDbContext : DbContext
    {
        public PartnerDbContext(DbContextOptions<PartnerDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("partner");
            // ... entity configurations
        }
        public DbSet<Partner> Partners { get; set; }
    }
}
