using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;


namespace fakture.Models.Domain
{
    public class Korisnik:IdentityUser
    {
        public string LastName { get; set; }
        public IEnumerable<Faktura> Fakture { get; set; }

    }
}
