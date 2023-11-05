using fakture.Controllers.Products.ProductsDtos;
using fakture.Models;
using fakture.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace fakture.Controllers.Products.ProductsRepository
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly FaktureDbcontex _dbcontext;
        public ProductsRepository(FaktureDbcontex dbcontex)
        {
            _dbcontext = dbcontex;
        }

        public async Task<IEnumerable<FakturaDto>> GetFakture(string userId)
        {
            return await _dbcontext.Fakture.Include(x => x.Artikli)
               .Where(x => x.KorisnikId == userId)
               .Select(x => new FakturaDto(x))
               .ToListAsync();
        }

        public async Task<FakturaDto> GetFakturaById(int fakturaId)
        {
         var faktura = await _dbcontext.Fakture.Include(x => x.Artikli)
                .Where(x => x.FakturaId == fakturaId)
                .Select(x => new FakturaDto(x))
                .FirstAsync();
            return faktura;
        }

        public async  Task<ResponeDto> DeleteFaktura(int fakturaId)
        {
            var faktura = await _dbcontext.Fakture.Where(x => x.FakturaId == fakturaId).FirstOrDefaultAsync();
            if(faktura==null)
               return null;
            _dbcontext.Remove(faktura);
           if( await _dbcontext.SaveChangesAsync()>0)
                return new ResponeDto { Status = "Succes", Message = "Faktura uspjesno obrisana" };
            return null;

        }

        public async Task<FakturaDto> PostFaktura(CreateFakturaDto newFaktura, string userId)
        {
            var faktura = new Faktura(newFaktura);
            faktura.Korisnik = await _dbcontext.Korisnici.Where(x => x.Id == userId).FirstOrDefaultAsync();
            IEnumerable<Artikal> artikli = newFaktura.Artikli.Select(x => new Artikal(x, faktura)).ToList();
            await _dbcontext.AddAsync(faktura);
            await _dbcontext.AddRangeAsync(artikli);
            await _dbcontext.SaveChangesAsync();
            return new FakturaDto(faktura);
            
        }

        public async Task<FakturaDto> PutFaktura(PutFakturaDto upadateFaktura)
        {
            var faktura = await _dbcontext.Fakture.Where(x => x.FakturaId == upadateFaktura.FakturaId).FirstAsync();
            faktura.BrojFakture = upadateFaktura.BrojFakture;
            faktura.Datum = DateTime.Parse(upadateFaktura.Datum);
            faktura.Partner = upadateFaktura.Partner;
            faktura.PostoRabata = upadateFaktura.PostoRabata;
            foreach (var art in upadateFaktura.Artikli.Where(x => x.ArtikalId != null))
                await UpdateArtikal(art, faktura);
            foreach (var art in upadateFaktura.Artikli.Where(x => x.ArtikalId == null))
                await CreateArtikal( art,faktura);
            return new FakturaDto(faktura);
        }
        public async Task<ArtikalDto> UpdateArtikal(PutArtikalDto upArtikal,Faktura faktura)
        {
            var artikalToUpdate = await _dbcontext.Artikli.Where(x => x.ArtikalId == upArtikal.ArtikalId).FirstAsync();
            artikalToUpdate.Kolicina = upArtikal.Kolicina;
            artikalToUpdate.NazivArtikla = upArtikal.NazivArtikla;
            artikalToUpdate.Cijena = upArtikal.Cijena;
            artikalToUpdate.PostoRabata = upArtikal.PostoRabata;
             _dbcontext.Update(artikalToUpdate);
            return new ArtikalDto(artikalToUpdate);
        }
        public async Task CreateArtikal(PutArtikalDto upArtikal, Faktura faktura)
        {
            Artikal artikal = new Artikal();
            artikal.Kolicina = upArtikal.Kolicina;
            artikal.NazivArtikla = upArtikal.NazivArtikla;
            artikal.Cijena = upArtikal.Cijena;
            artikal.PostoRabata = upArtikal.PostoRabata;
            artikal.Faktura = faktura;
            await _dbcontext.Artikli.AddAsync(artikal);
        }
        public async Task<ResponeDto> DeleteArtikal(int artikalId)
        {
            var artikal = await _dbcontext.Artikli.Where(x => x.ArtikalId == artikalId).FirstOrDefaultAsync();
            if (artikal == null)
                return null;
            _dbcontext.Remove(artikal);
            if (await _dbcontext.SaveChangesAsync() > 0)
                return new ResponeDto { Status = "Succes", Message = "Artikal uspjesno obrisan" };
            return null;
        }
    }
}
