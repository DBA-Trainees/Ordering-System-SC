using Abp.AutoMapper;
using OrderingSystem.Entities;

namespace OrderingSystem.Types.Dto
{
    [AutoMapTo(typeof(Type))]
    public class CreateTypeDto
    {
        public string Name { get; set; }
    }
}
