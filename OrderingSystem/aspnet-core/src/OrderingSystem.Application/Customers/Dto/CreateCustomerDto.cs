using Abp.AutoMapper;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using System.Collections.Generic;

namespace OrderingSystem.Customers.Dto
{
    [AutoMapTo(typeof(Customer))]
    public class CreateCustomerDto
    {
        public string Name { get; set; }
        public int DivisionId { get; set; }
    }
}
