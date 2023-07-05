using Domain.Contracts.Interfaces.Repositories;

namespace Domain.Contracts.Interfaces
{
    public interface IRepositoryManager : IDisposable
    {
        public IInvoiceRepository InvoiceRepository { get; }
        public IStatusRepository StatusRepository { get; }

        void SaveChanges();
    }
}
