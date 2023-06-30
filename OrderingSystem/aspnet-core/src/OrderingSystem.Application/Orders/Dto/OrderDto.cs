using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Microsoft.VisualBasic;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;

namespace OrderingSystem.Orders.Dto
{
    [AutoMapFrom(typeof(Order))]
    [AutoMapTo(typeof(Order))]
    public class OrderDto : EntityDto<int>
    {
        public int Quantity { get; set; }
        public int? Size { get; set; }
        public DateAndTime Ordered { get; set; }
        public int FoodId { get; set; }
        public FoodDto Food { get; set; }
        public int CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
    }
}
