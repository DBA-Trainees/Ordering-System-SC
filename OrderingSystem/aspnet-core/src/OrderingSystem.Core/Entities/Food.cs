using Abp.Domain.Entities.Auditing;

namespace OrderingSystem.Entities
{
    public class Food : FullAuditedEntity<int>
    {
        public byte[] Image { get; set; }
        public string Name { get; set; }
        public bool Availability { get; set; }
        public int Quantity { get; set; }
        public int? Size { get; set; }
        public int Price { get; set; }
        public Category Category { get; set; }
        public int? CategoryId { get; set; }
        public Type Type { get; set; }
        public int? TypeId { get; set; }
    }
}
