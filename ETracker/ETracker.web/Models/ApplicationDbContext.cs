using Microsoft.EntityFrameworkCore;

namespace ETracker.web.Models
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions options):base(options)
        {}

        public DbSet<Employee> Employees { get; set; }
        //public DbSet<Category> Categories { get; set; }
    }
}
