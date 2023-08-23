using Abp.Domain.Entities.Auditing;
using Microsoft.VisualBasic;
using System;

namespace OrderingSystem.Entities
{
    public class Cart : FullAuditedEntity<int>
    {
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public string? Notes { get; set; }
        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int? FoodId { get; set; }
        public Food Food { get; set; }
        public DateTime DateTimeAdded { get; set; }
        public double? Amount { get; set; }

    }
}
