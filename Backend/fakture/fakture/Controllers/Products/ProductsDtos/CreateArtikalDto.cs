namespace fakture.Controllers.Products.ProductsDtos
{
    public class CreateArtikalDto
    {
        public string NazivArtikla { get; set; }
        public int Kolicina { get; set; }
        public float Cijena { get; set; }
        public float PostoRabataArtikla { get; set; }
    }
}
