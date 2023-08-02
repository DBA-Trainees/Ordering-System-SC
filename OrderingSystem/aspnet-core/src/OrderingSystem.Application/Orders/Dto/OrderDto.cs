using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;

namespace OrderingSystem.Orders.Dto
{
    [AutoMapTo(typeof(Order))]
    [AutoMapFrom(typeof(Order))]
    public class OrderDto : EntityDto<int>
    {
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public int FoodId { get; set; }
        public FoodDto Food { get; set; }
    }
}
