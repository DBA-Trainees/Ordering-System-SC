using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Entities;
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
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword) || x.Division.Name.Contains(input.Keyword))
                .Select(x => ObjectMapper.Map<CustomerDto>(x))
                .ToListAsync();

            return new PagedResultDto<CustomerDto>(query.Count, query);
        }

        protected override IQueryable<Customer> CreateFilteredQuery(PagedCustomerResultRequestDto input)
        {
            return Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword));
        }
    }
}
