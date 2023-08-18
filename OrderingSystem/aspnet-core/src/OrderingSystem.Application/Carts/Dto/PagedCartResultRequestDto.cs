using Abp.Application.Services.Dto;

namespace OrderingSystem.Carts.Dto
{
    public class PagedCartResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}
