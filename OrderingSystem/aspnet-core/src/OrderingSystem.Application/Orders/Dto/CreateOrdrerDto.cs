using Abp.AutoMapper;
using Microsoft.VisualBasic;
using OrderingSystem.Entities;

namespace OrderingSystem.Orders.Dto
{
    [AutoMapTo(typeof(Order))]
    public class CreateOrdrerDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int? Size { get; set; }
        public DateAndTime Ordered { get; set; }
        public int FoodId { get; set; }
        public int CustomerId { get; set; }
    }
}
