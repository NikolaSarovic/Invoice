using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace fakture.Models.Domain
{
    public class Artikal
    {
        [Key]
        public int ArtikalId { get; set; }
        public string NazivArtikla { get; set; }
        public int Kolicina { get; set; }
        public float Cijena { get; set; }
        public float PostoRabata { get; set; }
       
        [ForeignKey(nameof(Faktura))]
        public int FakturaId { get; set; }
        public Faktura Faktura { get; set; }
    }
}
