﻿using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using System.Linq;
using OrderingSystem.Categories.Dto;
using System.Collections.Generic;
using Abp.Linq.Extensions;
using Abp.Extensions;
using Abp.Collections.Extensions;

namespace OrderingSystem.Foods
{
    public class FoodAppService : AsyncCrudAppService<Food, FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>, IFoodAppService
    {
        private readonly IRepository<Food, int> _repository;
        public FoodAppService(IRepository<Food, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task<FoodDto> CreateAsync(CreateFoodDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<FoodDto>> GetAllAsync(PagedFoodResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<FoodDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<FoodDto> UpdateAsync(FoodDto input)
        {
            return base.UpdateAsync(input);
        }

        protected override Task<Food> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }

        public async Task<List<FoodDto>> GetAllFoods()
        {
            var query = await _repository.GetAll()
                .Select(x => ObjectMapper.Map<FoodDto>(x))
                .ToListAsync();

            return query;
        }
        //public async Task<PagedResultDto<FoodDto>> GetAllFoodFromCategories(PagedFoodResultRequestDto input)
        //{
        //    var query = await _repository.GetAll()
        //        .Include(x => x.Category)
        //        .Select(x => ObjectMapper.Map<FoodDto>(x))
        //        .ToListAsync();

        //    return new PagedResultDto<FoodDto>(query.Count, query);
        //}
        //public async Task<PagedResultDto<FoodDto>> GetAllFoodWithTypes(PagedFoodResultRequestDto input)
        //{
        //    var food = await _repository.GetAll()
        //    .Include(x => x.Type)
        //    .Select(x => ObjectMapper.Map<FoodDto>(x))
        //    .ToListAsync();

        //    return new PagedResultDto<FoodDto>(food.Count, food);
        //}

        public async Task<PagedResultDto<FoodDto>> GetFoodWithCategoriesAndType(PagedFoodResultRequestDto input)
        {
            var food = await _repository.GetAll()
                .Include(x => x.Category)
                .Include(x => x.Type)
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword) || x.Category.Name.Contains(input.Keyword) || x.Type.Name.Contains(input.Keyword))
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<FoodDto>(x))
                .ToListAsync();

            return new PagedResultDto<FoodDto>(food.Count(), food);
        }
    }
}
