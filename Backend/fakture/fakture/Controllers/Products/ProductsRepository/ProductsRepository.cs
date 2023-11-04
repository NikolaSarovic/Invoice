using fakture.Controllers.Products.ProductsDtos;
using fakture.Models;
using Microsoft.EntityFrameworkCore;

namespace fakture.Controllers.Products.ProductsRepository
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly FaktureDbcontex _dbcontext;
        public ProductsRepository(FaktureDbcontex dbcontex)
        {
            _dbcontext = dbcontex;
        }

        public async Task<ArtikalDto> DeleteArtikal(int artikalId)
        {
            var artikal = await _dbcontext.Artikli.Where(x => x.ArtikalId == artikalId).FirstOrDefaultAsync();
            if (artikal == null)
                return null;
            _dbcontext.Remove(artikal);
            await _dbcontext.SaveChangesAsync();
            return new ArtikalDto(artikal);
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

        public async  Task<FakturaDto> DeleteFaktura(int fakturaId)
        {
            var faktura = await _dbcontext.Fakture.Where(x => x.FakturaId == fakturaId).FirstOrDefaultAsync();
            if(faktura==null)
               return null;
            _dbcontext.Remove(faktura);
            await _dbcontext.SaveChangesAsync();
            return new FakturaDto(faktura);

        }
    }
}
