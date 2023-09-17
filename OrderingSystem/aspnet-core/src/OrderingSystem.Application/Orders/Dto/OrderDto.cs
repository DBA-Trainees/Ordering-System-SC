using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Carts.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using System;

namespace OrderingSystem.Orders.Dto
{
    [AutoMapTo(typeof(Order))]
    [AutoMapFrom(typeof(Order))]
    public class OrderDto : EntityDto<int>
    {
        public string? Size { get; set; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
        public DateTime Ordered { get; set; }
        public double TotalAmount { get; set; }
        public int CartId { get; set; }
        public CartDto Cart { get; set; }
    }
}
