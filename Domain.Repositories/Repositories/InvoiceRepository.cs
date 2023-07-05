using AppDbContext;
using Domain.Contracts.Interfaces.Repositories;
using Domain.Contracts.Models;
using Domain.Repositories.Repositories.Common;

namespace Domain.Repositories.Repositories
{
    public class InvoiceRepository : GeneralRepository<Invoice>, IInvoiceRepository
    {
        #region constructor

        public InvoiceRepository(IAppDbContext context)
            : base(context)
        {

        }

        #endregion
    }
}
