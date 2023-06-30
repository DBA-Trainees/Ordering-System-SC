using Abp.Application.Services;
using OrderingSystem.Customers.Dto;

namespace OrderingSystem.Customers
{
    public interface ICustomerAppService : IAsyncCrudAppService<CustomerDto, int, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>
    {
    }
}
