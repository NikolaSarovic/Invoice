using Azure;
using fakture.Controllers.Products.ProductsDtos;
using fakture.Controllers.Products.ProductsRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace fakture.Controllers.Products
{
    public class ProductsController : Controller
    {
        private IProductsRepository _repo;
        public ProductsController(IProductsRepository repo)
        {
            _repo = repo;
        }
        [Authorize]
        [HttpGet("Products/Get")]
        public async Task<ActionResult<IEnumerable<FakturaDto>>> GetFakture()
        {
            string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = await _repo.GetFakture(userId);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest();
        }
        [Authorize]
        [HttpGet("Products/GetId")]
        public async Task<ActionResult<FakturaDto>> GetFakturaById(int fakturaId)
        {
            return Ok(await _repo.GetFakturaById(fakturaId));
        }
        [Authorize]
        [HttpDelete("Products/DeleteItem")]
        public async Task<ActionResult<ResponeDto>> DeleteArtikal(int artikalId)
        {
            var result = await _repo.DeleteArtikal(artikalId);
            if (result == null)
                return BadRequest(new ResponeDto { Status = "Error", Message = "Nije moguće izvršiti akciju!" });
            return Ok(result);
        }
        [Authorize]
        [HttpDelete("Products/DeleteInvoice")]
        public async Task<ActionResult<ResponeDto>> DeleteFaktura(int fakturaId)
        {
            var result = await _repo.DeleteFaktura(fakturaId);
            if (result == null)
                return BadRequest(new ResponeDto { Status = "Error", Message = "Nije moguće izvršiti akciju!" });
            return Ok(result);


        }
        [Authorize]
        [HttpPost("Products/PostInvoice")]
        public async Task<ActionResult<FakturaDto>> PostFaktura([FromBody] CreateFakturaDto newFaktura)
        {
            string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = await _repo.PostFaktura(newFaktura, userId);
            return Ok(result);
        }
        [Authorize]
        [HttpPost("Products/PostItem")]
        public async Task<ActionResult<FakturaDto>> PostArtikal([FromBody] CreateArtikalDto art, int fakturaId)
        {
            var result = await _repo.CreateArtikal(art, fakturaId);
            return Ok(result);
        }
        [Authorize]
        [HttpPut("Products/PutInvoice")]
        public async Task<ActionResult<FakturaDto>> PutFaktura([FromBody] PutFakturaDto newFaktura)
        {
            var result = await _repo.PutFaktura(newFaktura);
            return Ok(result);
        }
        [Authorize]
        [HttpPut("Products/PutItem")]
        public async Task<ActionResult<FakturaDto>> UpdateArtikal([FromBody] PutArtikalDto art)
        {
            var result = await _repo.PutArtikal(art);
            return Ok(result);
        }
        [Authorize]
        [Route("GetPaginatedInovice")]
        [HttpGet]
        public async Task<ActionResult<PaginatedDataDto<FakturaDto>>> GetPaginatedList(int currentPage)
        {
            
            var returnList = new PaginatedDataDto<FakturaDto>(null, 0, false, false, 0);
            returnList = await _repo.GetPaginatedList(currentPage);

            return Ok(returnList);
        }
    }
}
