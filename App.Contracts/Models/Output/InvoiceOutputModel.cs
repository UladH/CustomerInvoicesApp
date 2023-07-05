namespace App.Contracts.Models.Output
{
    public record InvoiceOutputModel
    {
        public uint Id { get; set; }
        public decimal Amount { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Status { get; set; }
        public uint StatusId { get; set; }
    }
}
