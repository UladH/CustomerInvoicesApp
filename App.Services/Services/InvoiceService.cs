using App.Contracts.Interfaces;
using App.Contracts.Models.Output;
using AutoMapper;
using Domain.Contracts.Interfaces;
using Domain.Contracts.Models;

namespace App.Services.Services
{
    public class InvoiceService: IInvoiceService
    {
        private IRepositoryManager repositoryManager;
        private IMapper mapper;

        #region constructor

        public InvoiceService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            this.repositoryManager = repositoryManager;
            this.mapper = mapper;
        }

        #endregion

        #region public

        public IEnumerable<InvoiceOutputModel> GetAll()
        {
            var invoices = repositoryManager.InvoiceRepository.GetAll();
            var invoiceOutputModels = mapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceOutputModel>>(invoices);

            return invoiceOutputModels;
        }

        public InvoiceOutputModel Get(uint id)
        {
            var invoice = repositoryManager.InvoiceRepository.Get(id);

            if(invoice == null)
            {
                throw new ArgumentException("Given Id not found.", "id");
            }

            var invoiceOutputModel = mapper.Map<Invoice, InvoiceOutputModel>(invoice);

            return invoiceOutputModel;
        }

        #endregion
    }
}
