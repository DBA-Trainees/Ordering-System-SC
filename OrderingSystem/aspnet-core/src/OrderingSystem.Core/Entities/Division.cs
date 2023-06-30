using Abp.Domain.Entities.Auditing;

namespace OrderingSystem.Entities
{
    public class Division : FullAuditedEntity<int>
    {
        public string Name { get; set; }
    }
}
