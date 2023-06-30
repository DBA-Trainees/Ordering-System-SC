using Abp.Domain.Entities.Auditing;

namespace OrderingSystem.Entities
{
    public class Type : FullAuditedEntity<int>
    {
        public string Name { get; set; }
    }
}
