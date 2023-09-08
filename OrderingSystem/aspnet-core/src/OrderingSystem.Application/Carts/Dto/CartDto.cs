using Abp.AutoMapper;
using Abp.Application.Services.Dto;
using OrderingSystem.Entities;
using Microsoft.VisualBasic;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Foods.Dto;
using System;

namespace OrderingSystem.Carts.Dto
{
    [AutoMapTo(typeof(Cart))]
    [AutoMapFrom(typeof(Cart))]
    public class CartDto : EntityDto<int>
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public string? Notes { get; set; }
        public DateTime? DateTimeAdded { get; set; }
        public int CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public int FoodId { get; set; }
        public FoodDto Food { get; set; }
        public double? Amount { get; set; }
    }
}
