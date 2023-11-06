using fakture.Models.Domain;

namespace fakture.Controllers.Services
{
    public interface ICalculation
    {
        public CalculationDto ArtikalCalculation(Artikal art);
        public CalculationDto FakturaCalculation(Faktura fak);
    }
}
