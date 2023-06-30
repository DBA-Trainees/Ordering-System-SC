using Abp.Application.Services.Dto;

namespace OrderingSystem.Types.Dto
{
    public class PagedTypeResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}
