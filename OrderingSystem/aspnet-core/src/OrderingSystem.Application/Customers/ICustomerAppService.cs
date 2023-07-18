using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Divisions.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderingSystem.Customers
{
    public interface ICustomerAppService : IAsyncCrudAppService<CustomerDto, int, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>
    {
        Task<PagedResultDto<CustomerDto>> GetAllCustomersWithDivision(PagedCustomerResultRequestDto input);
    }
}
