using Abp.Application.Services.Dto;

namespace OrderingSystem.Foods.Dto
{
    public class PagedFoodResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}
