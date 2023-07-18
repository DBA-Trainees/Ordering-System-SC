using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;

namespace OrderingSystem.Customers.Dto
{
    [AutoMapFrom(typeof(Customer))]
    [AutoMapTo(typeof(Customer))]
    public class CustomerDto : EntityDto<int>
    {
        public string Name { get; set; }
        public int? DivisionId { get; set; }
        public DivisionDto Division { get; set; }
    }
}
