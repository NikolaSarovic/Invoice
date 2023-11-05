using fakture.Controllers.Products.ProductsDtos;

namespace fakture.Controllers.Products.ProductsRepository
{
    public interface IProductsRepository
    {
        public Task<IEnumerable<FakturaDto>> GetFakture(string userId);
        public Task<FakturaDto> GetFakturaById(int fakturaId);
        public Task<ResponeDto> DeleteArtikal(int artikalId);
        public Task<ResponeDto> DeleteFaktura(int fakturaId);
        public Task<FakturaDto> PostFaktura(CreateFakturaDto newFaktura, string userId);
        public Task<FakturaDto> PutFaktura(PutFakturaDto upadateFaktura);
    }
}
