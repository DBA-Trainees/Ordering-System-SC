using Abp.Domain.Entities.Auditing;
using Microsoft.VisualBasic;

namespace OrderingSystem.Entities
{
    public class Order : FullAuditedEntity<int>
    {
        public int Quantity { get; set; }
        public int? Size { get; set; }
        public Food Food { get; set; }
        public Customer Customer { get; set; }
        public string Notes { get; set; }
        public DateAndTime Ordered { get; set; }
    }
}
