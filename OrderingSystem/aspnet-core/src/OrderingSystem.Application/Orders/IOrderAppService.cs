using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystem.Orders.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderingSystem.Orders
{
    public interface IOrderAppService : IAsyncCrudAppService<OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>
    {
        Task<List<OrderDto>> GetAllOrders();
        Task<PagedResultDto<OrderDto>> GetCartsWithFood(PagedOrderResultRequestDto input);
    }
}
