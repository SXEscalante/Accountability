using Accountability.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Accountability.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Define DbSets for your tables here
        public DbSet<Event> Events { get; set; }
    }
}
