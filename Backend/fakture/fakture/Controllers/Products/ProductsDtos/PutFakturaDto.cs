namespace fakture.Controllers.Products.ProductsDtos
{
    public class PutFakturaDto
    {
        public int FakturaId { get; set; }
        public string BrojFakture { get; set; }
        public string Datum { get; set; }
        public string Partner { get; set; }
        public float PostoRabata { get; set; }
        public IEnumerable<PutArtikalDto> Artikli { get; set; }
    }
}
