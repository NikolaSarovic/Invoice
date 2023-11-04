using fakture.Models.Domain;

namespace fakture.Controllers.Products.ProductsDtos
{
    public class ArtikalDto
    {
        public int ArtikalId { get; set; }
        public string NazivArtikla { get; set; }
        public int Kolicina { get; set; }
        public float Cijena { get; set; }
        public float PostoRabata { get; set; }

        public ArtikalDto(Artikal dbArtikal)
        {
            ArtikalId = dbArtikal.ArtikalId;
            NazivArtikla = dbArtikal.NazivArtikla;
            Kolicina = dbArtikal.Kolicina;
            Cijena = dbArtikal.Cijena;
            PostoRabata = dbArtikal.PostoRabata;

        }
    }
}
