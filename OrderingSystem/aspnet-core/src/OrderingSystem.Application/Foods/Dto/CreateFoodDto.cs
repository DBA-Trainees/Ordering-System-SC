using Abp.AutoMapper;
using OrderingSystem.Entities;

namespace OrderingSystem.Foods.Dto
{
    [AutoMapTo(typeof(Type))]
    public class CreateFoodDto
    {
        public string Image { get; set; }
        public string Name { get; set; }
        public bool Availability { get; set; }
        public int Quantity { get; set; }
        public int? Size { get; set; }
        public int Price { get; set; }
    }
}
