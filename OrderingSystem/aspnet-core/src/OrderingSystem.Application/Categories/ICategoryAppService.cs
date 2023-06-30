using Abp.Application.Services;
using OrderingSystem.Categories.Dto;

namespace OrderingSystem.Categories
{
    public interface ICategoryAppService : IAsyncCrudAppService<CategoryDto, int, PagedCategoryResultRequestDto, CreateCategoryDto, CategoryDto>
    {
    }
}
