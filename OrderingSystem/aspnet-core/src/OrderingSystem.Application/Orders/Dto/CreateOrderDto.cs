using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;

namespace OrderingSystem.Orders.Dto
{
    [AutoMapTo(typeof(Order))]
    public class CreateOrderDto
    {
        public string? Notes { get; set; }
        public DateTime Ordered { get; set; }
        public double TotalAmount { get; set; }
        public int? CartId { get; set; }
    }
}
