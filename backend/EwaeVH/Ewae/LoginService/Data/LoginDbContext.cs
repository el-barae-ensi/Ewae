using LoginService.Model;
using Microsoft.EntityFrameworkCore;

namespace LoginService.Data
{
    // Data/LoginDbContext.cs
    public class LoginDbContext : DbContext
    {
    
        public LoginDbContext(DbContextOptions<LoginDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("login");
            // ... entity configurations
        }
        public DbSet<User> Users { get; set; }
    }
}
