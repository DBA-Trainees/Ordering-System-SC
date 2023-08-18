using Abp.Application.Services;
using OrderingSystem.Carts.Dto;

namespace OrderingSystem.Carts
{
    public interface ICartAppService : IAsyncCrudAppService<CartDto, int, PagedCartResultRequestDto, CreateCartDto, CartDto>
    {
    }
}
