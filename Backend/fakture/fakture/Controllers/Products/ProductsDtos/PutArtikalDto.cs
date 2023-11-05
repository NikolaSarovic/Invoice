namespace fakture.Controllers.Products.ProductsDtos
{
    public class PutArtikalDto
    {
        
            public int? ArtikalId { get; set; }
            public string NazivArtikla { get; set; }
            public int Kolicina { get; set; }
            public float Cijena { get; set; }
            public float PostoRabata { get; set; }
            public float Pdv { get; set; }
        
    }
}
