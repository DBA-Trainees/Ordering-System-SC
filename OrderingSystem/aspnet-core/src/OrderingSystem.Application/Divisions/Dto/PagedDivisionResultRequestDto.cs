using Abp.Application.Services.Dto;

namespace OrderingSystem.Divisions.Dto
{
    public class PagedDivisionResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}
