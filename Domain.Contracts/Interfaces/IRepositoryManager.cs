using Domain.Contracts.Interfaces.Repositories;

namespace Domain.Contracts.Interfaces
{
    public interface IRepositoryManager : IDisposable
    {
        public IInvoiceRepository InvoiceRepository { get; }

        void SaveChanges();
    }
}
