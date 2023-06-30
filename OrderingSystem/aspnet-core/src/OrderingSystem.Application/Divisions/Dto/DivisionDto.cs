using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;

namespace OrderingSystem.Divisions.Dto
{
    [AutoMapFrom(typeof(Division))]
    [AutoMapTo(typeof(Division))]
    public class DivisionDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}
