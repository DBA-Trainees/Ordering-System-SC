using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystem.Orders.Dto;
using System.Threading.Tasks;

namespace OrderingSystem.Orders
{
    public interface IOrderAppService : IAsyncCrudAppService<OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>
    {
        Task<PagedResultDto<OrderDto>> GetAllOrdersWithFood(PagedOrderResultRequestDto input);
    }
}
