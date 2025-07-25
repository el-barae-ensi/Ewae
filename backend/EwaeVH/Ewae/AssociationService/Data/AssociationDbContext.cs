using AssociationService.Model;
using Microsoft.EntityFrameworkCore;

namespace AssociationService.Data
{
    // Data/AssociationDbContext.cs
    public class AssociationDbContext : DbContext
    {
        public AssociationDbContext(DbContextOptions<AssociationDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("association");
            // ... entity configurations
        }
        public DbSet<Association> Associations { get; set; }
    }
}
