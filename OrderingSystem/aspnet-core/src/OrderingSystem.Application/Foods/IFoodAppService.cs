﻿using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystem.Foods.Dto;
using System.Threading.Tasks;

namespace OrderingSystem.Foods
{
    public interface IFoodAppService : IAsyncCrudAppService<FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>
    {
        Task<PagedResultDto<FoodDto>> GetFoodWithCategoriesAndType(PagedFoodResultRequestDto input);
    }
}
