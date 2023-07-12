using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;

namespace OrderingSystem.Categories.Dto
{
    [AutoMapTo(typeof(Category))]
    [AutoMapFrom(typeof(Category))]
    public class CategoryDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}
