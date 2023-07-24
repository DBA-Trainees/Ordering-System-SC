using Abp.Application.Services;
using OrderingSystem.Categories.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderingSystem.Categories
{
    public interface ICategoryAppService : IAsyncCrudAppService<CategoryDto, int, PagedCategoryResultRequestDto, CreateCategoryDto, CategoryDto>
    {
        Task<List<CategoryDto>> GetAllCategories();
    }
}
