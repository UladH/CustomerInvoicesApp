using AppDbContext;
using Domain.Contracts.Interfaces.Repositories;
using Domain.Contracts.Models;
using Domain.Repositories.Repositories.Common;
using Microsoft.EntityFrameworkCore;

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

        #region public

        public override IEnumerable<Invoice> GetAll()
        {
            return dbset.Include(t => t.Status).AsEnumerable();
        }

        public Invoice Get(uint id)
        {
            return dbset.Include(t => t.Status).FirstOrDefault(e => e.Id == id);
        }

        #endregion
    }
}
