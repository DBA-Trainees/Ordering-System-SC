using Abp.Application.Services;
using OrderingSystem.Divisions.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderingSystem.Divisions
{
    public interface IDivisionAppService : IAsyncCrudAppService<DivisionDto, int, PagedDivisionResultRequestDto, CreateDivisionDto, DivisionDto>
    {
        Task<List<DivisionDto>> GetAllDivisions();
    }
}
