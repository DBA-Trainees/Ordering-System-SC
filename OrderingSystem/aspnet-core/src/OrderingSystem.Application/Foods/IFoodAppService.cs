using Abp.Application.Services;
using OrderingSystem.Foods.Dto;

namespace OrderingSystem.Foods
{
    public interface IFoodAppService : IAsyncCrudAppService<FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>
    {
    }
}
