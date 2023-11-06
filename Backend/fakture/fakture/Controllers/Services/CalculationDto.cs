namespace fakture.Controllers.Services
{
    public class CalculationDto
    {
        public float IznosBezPdv { get; set; }
        public float Rabat { get; set; }
        public float IznosRabatBezPdv { get; set; }
        public float Pdv { get; set; }
        public float Ukupno { get; set; }

        public CalculationDto()
        {

        }

    }
}
