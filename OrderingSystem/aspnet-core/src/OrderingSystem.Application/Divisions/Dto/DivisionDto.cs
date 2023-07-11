using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;

namespace OrderingSystem.Divisions.Dto
{
    [AutoMapTo(typeof(Division))]
    [AutoMapFrom(typeof(Division))]
    
    public class DivisionDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}
