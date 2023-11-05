namespace fakture.Controllers.Products.ProductsDtos
{
    public class CreateFakturaDto
    {
        public string BrojFakture { get; set; }
        public string Datum { get; set; }
        public string Partner { get; set; }
        public float PostoRabata { get; set; }
        public IEnumerable<CreateArtikalDto> Artikli { get; set; }

    }
}
