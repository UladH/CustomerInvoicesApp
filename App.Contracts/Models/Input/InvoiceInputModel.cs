namespace App.Contracts.Models.Input
{
    public record InvoiceInputModel
    {
        public uint? Id { get; set; }
        public decimal Amount { get; set; }
        public DateTimeOffset Date { get; set; }
        public uint StatusId { get; set; }
    }
}
