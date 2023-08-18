using Abp.Domain.Entities.Auditing;
using System;

namespace OrderingSystem.Entities
{
    public class Food : FullAuditedEntity<int>
    {
        public byte[] Image { get; set; }
        public string ImageName { get; set; }
        public string ImageFileType { get; set; }
        public string Name { get; set; }
        public bool Availability { get; set; }
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public Double Price { get; set; }
        public int? CategoryId { get; set; }
        public Category Category { get; set; }
        public int? TypeId { get; set; }
        public Type Type { get; set; }
    }
}
