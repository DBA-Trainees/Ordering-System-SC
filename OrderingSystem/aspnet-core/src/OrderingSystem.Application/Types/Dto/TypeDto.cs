using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;

namespace OrderingSystem.Types.Dto
{
    [AutoMapTo(typeof(Type))]
    [AutoMapFrom(typeof(Type))]
    public class TypeDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}
