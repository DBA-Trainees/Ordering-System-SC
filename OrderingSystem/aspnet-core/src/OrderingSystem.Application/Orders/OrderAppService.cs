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
using System.Linq.Dynamic.Core;

namespace OrderingSystem.Orders
{
    public class OrderAppService : AsyncCrudAppService<Order, OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>, IOrderAppService
    {
        private readonly IRepository<Order, int> _repository;
        private readonly IRepository<Food, int> _foodRepository;

        public OrderAppService(IRepository<Order, int> repository, IRepository<Food, int> foodRepository) : base(repository)
        {
            _repository = repository;
            _foodRepository = foodRepository;
        }

        public override async Task<OrderDto> CreateAsync(CreateOrderDto input)
        {
           
            var proceedOrder = new Order();
            proceedOrder.Id = input.Id;

            foreach(var o in input.CreateOrderDtos)
            {
                proceedOrder = ObjectMapper.Map<Order>(input);
                proceedOrder.Id = o.Id;

                await _repository.InsertAsync(proceedOrder);
            }

            return base.MapToEntityDto(proceedOrder);

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
        public async Task<List<OrderDto>> GetAllOrders()
        {
            var orders = await _repository.GetAll()
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return orders;
        }

        public async Task<PagedResultDto<OrderDto>> GetCartsWithFood(PagedOrderResultRequestDto input)
        {
            var userCustomer = AbpSession.UserId;

            var query = await _repository.GetAll()
                .Include(x => x.Cart)
                .ThenInclude(x => x.Food)
                .Where(x => x.CreatorUserId == userCustomer)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(query.Count(), query);
        }

    }
}
