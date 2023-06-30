using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;

namespace OrderingSystem.Types.Dto
{
    [AutoMapFrom(typeof(Type))]
    [AutoMapTo(typeof(Type))]
    public class TypeDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}
