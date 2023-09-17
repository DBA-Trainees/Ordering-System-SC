using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;

namespace OrderingSystem.Orders.Dto
{
    [AutoMapTo(typeof(Order))]
    public class CreateOrderDto
    {
        public int Id { get; set; }
        public string? Size { get; set; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
        public DateTime Ordered { get; set; }
        public double TotalAmount { get; set; }
        public int? CartId { get; set; }

        public List<CreateOrderDto> CreateOrderDtos { get; set; }
    }
}
