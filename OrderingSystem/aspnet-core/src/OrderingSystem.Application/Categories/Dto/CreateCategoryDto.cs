using Abp.AutoMapper;
using OrderingSystem.Entities;

namespace OrderingSystem.Categories.Dto
{
    [AutoMapTo(typeof(Category))]
    public class CreateCategoryDto
    {
        public string Name { get; set; }
    }
}
