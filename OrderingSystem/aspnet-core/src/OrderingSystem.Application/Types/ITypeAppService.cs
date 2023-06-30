using Abp.Application.Services;
using OrderingSystem.Types.Dto;

namespace OrderingSystem.Types
{
    public interface ITypeAppService : IAsyncCrudAppService<TypeDto, int, PagedTypeResultRequestDto, CreateTypeDto, TypeDto>
    {
    }
}
