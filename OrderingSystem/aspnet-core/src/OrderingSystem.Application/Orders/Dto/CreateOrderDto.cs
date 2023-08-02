using Abp.AutoMapper;
using OrderingSystem.Entities;
using System.ComponentModel.DataAnnotations;

namespace OrderingSystem.Orders.Dto
{
    [AutoMapTo(typeof(Order))]
    public class CreateOrderDto
    {
        public int Quantity { get; set; }
        public string? Size { get; set; }

        [Required]
        public int? FoodId { get; set; }
    }
}
