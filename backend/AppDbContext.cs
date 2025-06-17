using backend.model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<UserLocation> UserLocation { get; set; }
    }
}
