﻿using Abp.AutoMapper;
using Abp.Application.Services.Dto;
using OrderingSystem.Entities;
using Microsoft.VisualBasic;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Foods.Dto;

namespace OrderingSystem.Carts.Dto
{
    [AutoMapTo(typeof(Cart))]
    [AutoMapFrom(typeof(Cart))]
    public class CartDto : EntityDto<int>
    {
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public string? Notes { get; set; }
        public DateAndTime Purchased { get; set; }
        public int CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public int FoodId { get; set; }
        public FoodDto Food { get; set; }
    }
}