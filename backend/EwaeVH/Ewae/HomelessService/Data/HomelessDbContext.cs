using HomelessService.Model;
using Microsoft.EntityFrameworkCore;

namespace HomelessService.Data
{
    // Data/HomelessDbContext.cs
    public class HomelessDbContext : DbContext
    {
        public HomelessDbContext(DbContextOptions<HomelessDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("homeless");
            // ... entity configurations
        }
        public DbSet<Homeless> Homelesses { get; set; }
    }
}
