using Domain.Contracts.Interfaces.Repositories.Common;
using Domain.Contracts.Models;

namespace Domain.Contracts.Interfaces.Repositories
{
    public interface IInvoiceRepository: IGeneralRepository<Invoice>
    {
        Invoice Get(uint id);
    }
}
