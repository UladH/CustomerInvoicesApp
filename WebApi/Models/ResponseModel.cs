namespace WebApi.Models
{
    public record ResponseModel
    {
        public int StatusCode { get; set; }
        public object Data { get; set; }
        public ErrorResponseModel? Error { get; set; }
    }
}
