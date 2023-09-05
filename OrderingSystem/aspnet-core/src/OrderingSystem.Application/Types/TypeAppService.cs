using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Entities;
using OrderingSystem.Types.Dto;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderingSystem.Types
{
    public class TypeAppService : AsyncCrudAppService<Type, TypeDto, int, PagedTypeResultRequestDto, CreateTypeDto, TypeDto>, ITypeAppService
    {
        private readonly IRepository<Type, int> _repository;
        public TypeAppService(IRepository<Type, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task<TypeDto> CreateAsync(CreateTypeDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<TypeDto>> GetAllAsync(PagedTypeResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<TypeDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<TypeDto> UpdateAsync(TypeDto input)
        {
            return base.UpdateAsync(input);
        }

        protected override Task<Type> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }
        public async Task<List<TypeDto>> GetAllTypes()
        {
            var query = await _repository.GetAll()
                .Select(x => ObjectMapper.Map<TypeDto>(x))
                .ToListAsync();

            return query;
        }

        protected override IQueryable<Type> CreateFilteredQuery(PagedTypeResultRequestDto input)
        {
            return Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword));
        }
    }
}
