using App.Contracts.Models.Output;

namespace App.Contracts.Interfaces
{
    public interface IInvoiceService
    {
        IEnumerable<InvoiceOutputModel> GetAll();
        InvoiceOutputModel Get(uint id);
    }
}
