using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Types.Dto;

namespace OrderingSystem.Foods.Dto
{
    [AutoMapFrom(typeof(Food))]
    [AutoMapTo(typeof(Food))]
    public class FoodDto : EntityDto<int>
    {
        public string Image { get; set; }
        public string Name { get; set; }
        public bool Availability { get; set; }
        public int Quantity { get; set; }
        public int? Size { get; set; }
        public int Price { get; set; }
        public CategoryDto Category { get; set; }
        public TypeDto Type { get; set; }
    }
}
