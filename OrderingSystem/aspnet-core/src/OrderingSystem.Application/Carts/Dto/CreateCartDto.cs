using Abp.AutoMapper;
using Microsoft.VisualBasic;
using OrderingSystem.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace OrderingSystem.Carts.Dto
{
    [AutoMapTo(typeof(Cart))]
    public class CreateCartDto
    {
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public string? Notes { get; set; }
        public DateTime DateTimeAdded { get; set; }
        public double Amount { get; set; }

        [Required]
        public int CustomerId { get; set; }
        public int? FoodId { get; set; }

    }
}
