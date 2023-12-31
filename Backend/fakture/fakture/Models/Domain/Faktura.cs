﻿using fakture.Controllers.Products.ProductsDtos;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace fakture.Models.Domain
{
    public class Faktura
    {
        [Key]
        public int FakturaId { get; set; }

        [ForeignKey(nameof(Korisnik))]
        public string KorisnikId { get; set; }
        public Korisnik Korisnik { get; set; }
        public string BrojFakture { get; set; }
        public DateTime Datum { get; set; }
        public string Partner { get; set; }
        public float PostoRabata { get; set; }
        public IEnumerable<Artikal> Artikli { get; set; }

        public Faktura()
        {

        }
        public Faktura(CreateFakturaDto newFaktura)
        {
            BrojFakture = newFaktura.BrojFakture;
            Datum = DateTime.Parse(newFaktura.Datum);
            Partner = newFaktura.Partner;
            PostoRabata = newFaktura.PostoRabata;
        }



    }
}
