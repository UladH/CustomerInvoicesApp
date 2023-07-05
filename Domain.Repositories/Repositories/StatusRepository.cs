using AppDbContext;
using Domain.Contracts.Interfaces.Repositories;
using Domain.Contracts.Models;
using Domain.Repositories.Repositories.Common;

namespace Domain.Repositories.Repositories
{
    public class StatusRepository : GeneralRepository<Status>, IStatusRepository
    {
        #region constructor

        public StatusRepository(IAppDbContext context)
            : base(context)
        {

        }

        #endregion
    }
}
