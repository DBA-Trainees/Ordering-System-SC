using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystem.Carts.Dto;
using System.Threading.Tasks;

namespace OrderingSystem.Carts
{
    public interface ICartAppService : IAsyncCrudAppService<CartDto, int, PagedCartResultRequestDto, CreateCartDto, CartDto>
    {
        Task<PagedResultDto<CartDto>> GetAllFoodandCustomers(PagedCartResultRequestDto input);
        Task<PagedResultDto<CartDto>> GetCartsFromOrderList(PagedCartResultRequestDto input);
    }
}
