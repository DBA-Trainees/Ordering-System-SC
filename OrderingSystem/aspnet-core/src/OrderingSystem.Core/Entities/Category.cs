using Abp.Domain.Entities.Auditing;

namespace OrderingSystem.Entities
{
    public class Category : FullAuditedEntity<int>
    {
        public string Name { get; set; }
    }
}
