using Abp.Domain.Entities.Auditing;

namespace OrderingSystem.Entities
{
    public class Order : FullAuditedEntity<int>
    {
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public int? FoodId { get; set; } 
        public Food Food { get; set; }
    }
}
