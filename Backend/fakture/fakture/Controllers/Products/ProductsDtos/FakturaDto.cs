
using fakture.Controllers.Services;
using fakture.Models.Domain;

namespace fakture.Controllers.Products.ProductsDtos
{
    public class FakturaDto
    {
        public int FakturaId { get; set; }
        public string BrojFakture { get; set; }
        public string Datum { get; set; }
        public string Partner { get; set; }
        public float PostoRabata { get; set; }
        public CalculationDto Calculationdto { get; set; }
        public IEnumerable<ArtikalDto> Artikli { get; set; }

        public FakturaDto(Faktura dbFaktura)
        {
            FakturaId = dbFaktura.FakturaId;
            BrojFakture = dbFaktura.BrojFakture;
            Datum = dbFaktura.Datum.ToString("dd/M/yyyy");
            Partner = dbFaktura.Partner;
            PostoRabata = dbFaktura.PostoRabata;

            Calculationdto = new Calculation().FakturaCalculation(dbFaktura);
            Artikli = dbFaktura.Artikli.Select(x => new ArtikalDto(x));
            



        }
    }
}
