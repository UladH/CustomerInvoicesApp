namespace Domain.Contracts.Models
{
    public record Invoice
    {   
        public uint Id { get; set; }
        public decimal Amount { get; set; }
        public DateTimeOffset Date { get; set; }
        public Status Status { get; set; }
        public uint StatusId { get; set; }
    }
}
