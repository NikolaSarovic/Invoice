using fakture.Controllers.Products.ProductsDtos;
using fakture.Controllers.Services;
using fakture.Models;
using fakture.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.InteropServices;

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
            var faktura = await _dbcontext.Fakture.Where(x => x.FakturaId == upadateFaktura.FakturaId).FirstOrDefaultAsync();
            faktura.BrojFakture = upadateFaktura.BrojFakture;
            faktura.Datum = DateTime.Parse(upadateFaktura.Datum);
            faktura.Partner = upadateFaktura.Partner;
            faktura.PostoRabata = upadateFaktura.PostoRabata;
            faktura.Artikli = await _dbcontext.Artikli.Where(x => x.FakturaId == upadateFaktura.FakturaId).ToListAsync();
            _dbcontext.Update(faktura);
           await  _dbcontext.SaveChangesAsync();
            return new FakturaDto(faktura);

        }
        public async Task<ResponeDto> DeleteFaktura(int fakturaId)
        {
            var faktura = await _dbcontext.Fakture.Where(x => x.FakturaId == fakturaId).FirstOrDefaultAsync();
            if (faktura == null)
                return null;
            _dbcontext.Remove(faktura);
            if (await _dbcontext.SaveChangesAsync() > 0)
                return new ResponeDto { Status = "Succes", Message = "Faktura uspjesno obrisana" };
            return null;

        }

        public async Task<FakturaDto> CreateArtikal(CreateArtikalDto upArtikal, int fakturaId)
        {
            var faktura =await  _dbcontext.Fakture.Include(x=>x.Artikli).Where(x => x.FakturaId == fakturaId).FirstOrDefaultAsync();
            Artikal artikal = new Artikal(upArtikal,faktura);
            await _dbcontext.Artikli.AddAsync(artikal);
            await _dbcontext.SaveChangesAsync();
            return new FakturaDto(faktura);
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

        public async Task<FakturaDto> PutArtikal(PutArtikalDto upadateArtikal)
        {
            var artikal = await _dbcontext.Artikli.Where(x => x.ArtikalId == upadateArtikal.ArtikalId).FirstOrDefaultAsync();
            artikal.NazivArtikla = upadateArtikal.NazivArtikla;
            artikal.Kolicina= upadateArtikal.Kolicina;
            artikal.Cijena = upadateArtikal.Cijena;
            artikal.PostoRabata = upadateArtikal.PostoRabataArtikla;
            artikal.Faktura = await _dbcontext.Fakture.Include(x => x.Artikli).Where(x => x.FakturaId == artikal.FakturaId).FirstOrDefaultAsync();
            _dbcontext.Update(artikal.Faktura);
            _dbcontext.Update(artikal);
            await _dbcontext.SaveChangesAsync();
            return new FakturaDto(artikal.Faktura);
                 

            
        }
        public async Task<ArtikalDto> GetArtikalById(int artikalId)
        {
            var artikal = await _dbcontext.Artikli.
                Where(x => x.ArtikalId == artikalId)
               .Select(x => new ArtikalDto(x)).FirstOrDefaultAsync();
            return artikal;
        }

        public async Task<PaginatedDataDto<FakturaDto>> GetPaginatedList(int currentPage)
        {
          var fakture =  _dbcontext.Fakture.Include(x => x.Artikli).Select(x => new FakturaDto(x)).AsQueryable();
            return PaginatedList<FakturaDto>.ApplyPagination(fakture, currentPage, 2);
             
        }

       
    }
}

