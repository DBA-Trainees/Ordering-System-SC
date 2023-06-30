using Abp.AutoMapper;
using OrderingSystem.Entities;

namespace OrderingSystem.Divisions.Dto
{
    [AutoMapTo(typeof(Division))]
    public class CreateDivisionDto 
    {
        public string Name { get; set; }
    }
}
