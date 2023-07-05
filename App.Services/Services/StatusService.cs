using App.Contracts.Interfaces;
using App.Contracts.Models.Output;
using AutoMapper;
using Domain.Contracts.Interfaces;
using Domain.Contracts.Models;

namespace App.Services.Services
{
    public class StatusService: IStatusService
    {
        private IRepositoryManager repositoryManager;
        private IMapper mapper;

        #region constructor

        public StatusService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            this.repositoryManager = repositoryManager;
            this.mapper = mapper;
        }

        #endregion

        #region public

        public IEnumerable<StatusOutputModel> GetAll()
        {
            var statuses = repositoryManager.StatusRepository.GetAll();
            var statusOutputModels = mapper.Map<IEnumerable<Status>, IEnumerable< StatusOutputModel>>(statuses);

            return statusOutputModels;
        }

        #endregion
    }
}
