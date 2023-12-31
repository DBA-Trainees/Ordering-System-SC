﻿using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace OrderingSystem.Foods.Dto
{
    [AutoMapTo(typeof(Food))]
    public class CreateFoodDto
    {
        public byte[] Image { get; set; }
        public string ImageName { get; set; }
        public string ImageFileType { get; set; }
        public string Name { get; set; }
        public bool Availability { get; set; }
        public int Quantity { get; set; }
        public string? Size { get; set; }

        [Required]
        public double Price { get; set; }
        public int? CategoryId { get; set; }
        public int? TypeId { get; set; }
    }
}
