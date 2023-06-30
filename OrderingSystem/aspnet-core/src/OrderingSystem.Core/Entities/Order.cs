using Abp.Domain.Entities.Auditing;

namespace OrderingSystem.Entities
{
    public class Order : FullAuditedEntity<int>
    {
       public int Quantity { get; set; }
       public int? Size { get; set; }
       
    }
}
