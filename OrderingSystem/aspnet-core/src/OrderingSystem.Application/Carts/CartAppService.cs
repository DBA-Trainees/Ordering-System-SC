using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AutoMapper.Internal.Mappers;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Carts.Dto;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Entities;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using System.Linq;

namespace OrderingSystem.Carts
{
    public class CartAppService : AsyncCrudAppService<Cart, CartDto, int, PagedCartResultRequestDto, CreateCartDto, CartDto>, ICartAppService
    {
        private readonly IRepository<Cart, int> _cartRepository;

        public CartAppService(IRepository<Cart, int> repository) : base(repository)
        {
            _cartRepository = repository;
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

        public async Task<PagedResultDto<CartDto>> GetAllFoodandCustomers(PagedCartResultRequestDto input)
        {
            var query = await _cartRepository.GetAll()
                .Include(x => x.Food)
                .Include(x => x.Customer)
                .Select(x => ObjectMapper.Map<CartDto>(x))
                .ToListAsync();

            return new PagedResultDto<CartDto>(query.Count(), query);
        }
    }
}