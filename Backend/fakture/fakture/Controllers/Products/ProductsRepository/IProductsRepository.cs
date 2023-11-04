using fakture.Controllers.Products.ProductsDtos;

namespace fakture.Controllers.Products.ProductsRepository
{
    public interface IProductsRepository
    {
        public Task<IEnumerable<FakturaDto>> GetFakture(string userId);
        public Task<FakturaDto> GetFakturaById(int fakturaId);
        public Task<ArtikalDto> DeleteArtikal(int artikalId);
        public Task<FakturaDto> DeleteFaktura(int fakturaId);
    }
}
