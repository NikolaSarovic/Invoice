using fakture.Models.Domain;
using Microsoft.AspNetCore.Routing.Constraints;
using System;

namespace fakture.Controllers.Services
{
    public class Calculation:ICalculation
    {
     

        public Calculation( )
        {
         

        }
       public CalculationDto ArtikalCalculation(Artikal art)
        {
            float pdv=(float)0.17;
            float IznosBezPdv = (float)Math.Round(art.Kolicina * art.Cijena,2);
            float Rabat = (float)Math.Round((IznosBezPdv * art.PostoRabata) / 100, 2);
            float IznosSaRabatomBezPdv = IznosBezPdv - Rabat;
            float Pdv= (float)Math.Round((IznosSaRabatomBezPdv)* pdv, 2);
            float Ukupno = (float)Math.Round(IznosSaRabatomBezPdv + Pdv, 2);

            return new CalculationDto
            {
                IznosBezPdv = IznosBezPdv,
                Rabat = Rabat,
                IznosRabatBezPdv = IznosSaRabatomBezPdv,
                Pdv = Pdv,
                Ukupno = Ukupno
             };
            
        }
        public CalculationDto FakturaCalculation(Faktura fak)
        {
            float pdv = (float)0.17;
            float IznosBezPdv = 0;
            foreach (var item in fak.Artikli)
            {
                IznosBezPdv += (float)Math.Round(item.Kolicina * item.Cijena,2);
            }

            float Rabat = (float)Math.Round((IznosBezPdv * fak.PostoRabata) / 100, 2);
            float IznosSaRabatomBezPdv = IznosBezPdv - Rabat;
            float Pdv = (float)Math.Round((IznosSaRabatomBezPdv) * pdv, 2);
            float Ukupno = (float)Math.Round(IznosSaRabatomBezPdv + Pdv,2);

            return new CalculationDto
            {
                IznosBezPdv = IznosBezPdv,
                Rabat = Rabat,
                IznosRabatBezPdv = IznosSaRabatomBezPdv,
                Pdv = Pdv,
                Ukupno = Ukupno
            };
        }

    }
}
