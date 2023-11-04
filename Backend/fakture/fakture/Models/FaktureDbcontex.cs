using Microsoft.EntityFrameworkCore;
using fakture.Models.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace fakture.Models
{
    public class FaktureDbcontex: IdentityDbContext
    {
        public FaktureDbcontex(DbContextOptions<FaktureDbcontex> options) : base(options) 
        {

        }
        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Faktura> Fakture { get; set; }
        public DbSet<Artikal> Artikli { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = Guid.NewGuid().ToString(), Name = "Korisnik", NormalizedName = "KORISNIK" }
          );
        }
    }
}

