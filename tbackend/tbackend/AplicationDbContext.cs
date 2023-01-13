using Microsoft.EntityFrameworkCore;
using tbackend.Models;

namespace tbackend
{
    public class AplicationDbContext : DbContext
    {
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; }
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {
        }

        internal Task FindAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
