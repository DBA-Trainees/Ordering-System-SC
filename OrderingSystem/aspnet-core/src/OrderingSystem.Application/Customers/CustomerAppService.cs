using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderingSystem.Customers
{
    public class CustomerAppService : AsyncCrudAppService<Customer, CustomerDto, int, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>, ICustomerAppService
    {
        private readonly IRepository<Customer, int> _repository;
        public CustomerAppService(IRepository<Customer, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task<CustomerDto> CreateAsync(CreateCustomerDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<CustomerDto>> GetAllAsync(PagedCustomerResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<CustomerDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<CustomerDto> UpdateAsync(CustomerDto input)
        {
            return base.UpdateAsync(input);
        }

        protected override Task<Customer> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }
        public async Task<PagedResultDto<CustomerDto>> GetAllCustomersWithDivision(PagedCustomerResultRequestDto input)
        {
            var query = await _repository.GetAll()
                .Include(x => x.Division)
                .Select(x => ObjectMapper.Map<CustomerDto>(x))
                .ToListAsync();

            return new PagedResultDto<CustomerDto>(query.Count, query);
        }
    }
}
