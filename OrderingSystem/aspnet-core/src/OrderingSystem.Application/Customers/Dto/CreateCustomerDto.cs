using Abp.AutoMapper;
using OrderingSystem.Entities;

namespace OrderingSystem.Customers.Dto
{
    [AutoMapTo(typeof(Customer))]
    public class CreateCustomerDto
    {
        public string Name { get; set; }
        public int DivisionId { get; set; }
    }
}
