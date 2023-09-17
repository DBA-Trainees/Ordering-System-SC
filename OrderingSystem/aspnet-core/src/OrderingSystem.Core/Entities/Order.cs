using Abp.Domain.Entities.Auditing;
using System;

namespace OrderingSystem.Entities
{
    public class Order : FullAuditedEntity<int>
    {
        public string? Notes { get; set; }
        public DateTime Ordered { get; set; }
        public double TotalAmount { get; set; }
        public string? Size { get; set; }
        public int Quantity { get; set; }
        public int? CartId { get; set; }
        public Cart Cart { get; set; }
    }
}
