using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;

namespace OrderingSystem.Categories.Dto
{
    [AutoMapFrom(typeof(Category))]
    [AutoMapTo(typeof(Category))]
    public class CategoryDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}
