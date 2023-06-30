using Abp.AutoMapper;
using OrderingSystem.Entities;

namespace OrderingSystem.Foods.Dto
{
    [AutoMapTo(typeof(Type))]
    public class CreateFoodDto
    {
        public int Id { get; set; }
        public byte[] Image { get; set; }
        public string Name { get; set; }
        public bool Availability { get; set; }
        public int Quantity { get; set; }
        public int? Size { get; set; }
        public int Price { get; set; }
        public int? CategoryId { get; set; }
        public int? TypeId { get; set; }
    }
}
