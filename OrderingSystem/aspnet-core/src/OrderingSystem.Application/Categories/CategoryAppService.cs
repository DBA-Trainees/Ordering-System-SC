using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Entities;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using Abp.Collections.Extensions;
using Abp.Extensions;
using Abp.Linq.Extensions;

namespace OrderingSystem.Categories
{
    public class CategoryAppService : AsyncCrudAppService<Category, CategoryDto, int, PagedCategoryResultRequestDto, CreateCategoryDto, CategoryDto>, ICategoryAppService
    {
        private readonly IRepository<Category, int> _categoryRepository;
        public CategoryAppService(IRepository<Category, int> categoryRepository) : base(categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public override Task<CategoryDto> CreateAsync(CreateCategoryDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<CategoryDto>> GetAllAsync(PagedCategoryResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<CategoryDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<CategoryDto> UpdateAsync(CategoryDto input)
        {
            return base.UpdateAsync(input);
        }

        protected override Task<Category> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }
        public async Task<List<CategoryDto>> GetAllCategories()
        {
            var query = await _categoryRepository.GetAll()
                .Select(x => ObjectMapper.Map<CategoryDto>(x))
                .ToListAsync();

            return query;
        }
        protected override IQueryable<Category> CreateFilteredQuery(PagedCategoryResultRequestDto input)
        {
            return Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword));
            
        }
    }
}
