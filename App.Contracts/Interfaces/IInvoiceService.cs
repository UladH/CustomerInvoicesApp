using App.Contracts.Models.Input;
using App.Contracts.Models.Output;

namespace App.Contracts.Interfaces
{
    public interface IInvoiceService
    {
        IEnumerable<InvoiceOutputModel> GetAll();
        InvoiceOutputModel Get(uint id);
        InvoiceOutputModel Add(InvoiceInputModel invoiceInputModel);
        InvoiceOutputModel Update(InvoiceInputModel invoiceInputModel);
        uint Delete(uint id);
    }
}
