using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Carts.Dto;
using OrderingSystem.Entities;
using System.Threading.Tasks;

namespace OrderingSystem.Carts
{
    public class CartAppService : AsyncCrudAppService<Cart, CartDto, int, PagedCartResultRequestDto, CreateCartDto, CartDto>, ICartAppService
    {
        private readonly IRepository<Cart, int> _cartRepository;
        public CartAppService(IRepository<Cart, int> cartRepository) : base(cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public override Task<CartDto> CreateAsync(CreateCartDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<CartDto>> GetAllAsync(PagedCartResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<CartDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<CartDto> UpdateAsync(CartDto input)
        {
            return base.UpdateAsync(input);
        }

        protected override Task<Cart> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }
    }
}