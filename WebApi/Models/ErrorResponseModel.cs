namespace WebApi.Models
{
    public record ErrorResponseModel
    {
        public int? Code { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
    }
}
