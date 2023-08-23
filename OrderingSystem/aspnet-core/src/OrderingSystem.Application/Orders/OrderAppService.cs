using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using OrderingSystem.Entities;
using OrderingSystem.Orders.Dto;
using System.Threading.Tasks;
using OrderingSystem.Foods.Dto;
using System.Collections.Generic;

namespace OrderingSystem.Orders
{
    public class OrderAppService : AsyncCrudAppService<Order, OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>, IOrderAppService
    {
        private readonly IRepository<Order, int> _repository;

        public OrderAppService(IRepository<Order, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task<OrderDto> CreateAsync(CreateOrderDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<OrderDto>> GetAllAsync(PagedOrderResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<OrderDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<OrderDto> UpdateAsync(OrderDto input)
        {
            return base.UpdateAsync(input);
        }

        protected override Task<Order> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }

        //public async Task<PagedResultDto<OrderDto>> GetAllOrdersWithFood(PagedOrderResultRequestDto input)
        //{
        //    var query = await _repository.GetAll()
        //        .Include(x => x.Food)
        //        .Select(x => ObjectMapper.Map<OrderDto>(x))
        //        .ToListAsync();

        //    return new PagedResultDto<OrderDto>(query.Count, query);
        //}
        public async Task<List<OrderDto>> GetAllOrders()
        {
            var orders = await _repository.GetAll()
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return orders;
        }

        public async Task<PagedResultDto<OrderDto>> GetFoodWithCategoriesAndType(PagedOrderResultRequestDto input)
        {
            var query = await _repository.GetAll()
                .Include(x => x.Cart)
                .ThenInclude(x => x.Food)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(query.Count(), query);
        }
    }
}
