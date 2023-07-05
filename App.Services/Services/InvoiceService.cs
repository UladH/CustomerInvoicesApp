using App.Contracts.Interfaces;
using App.Contracts.Models.Input;
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

        public InvoiceOutputModel Add(InvoiceInputModel invoiceInputModel)
        {
            var invoice = mapper.Map<InvoiceInputModel, Invoice>(invoiceInputModel);

            repositoryManager.InvoiceRepository.Add(invoice);
            repositoryManager.SaveChanges();

            var invoiceOutputModel = mapper.Map<Invoice, InvoiceOutputModel>(invoice);

            return invoiceOutputModel;
        }

        public InvoiceOutputModel Update(InvoiceInputModel invoiceInputModel)
        {
            var invoice = mapper.Map<InvoiceInputModel, Invoice>(invoiceInputModel);

            repositoryManager.InvoiceRepository.Update(invoice);
            repositoryManager.SaveChanges();

            var invoiceOutputModel = mapper.Map<Invoice, InvoiceOutputModel>(invoice);

            return invoiceOutputModel;
        }

        public uint Delete(uint id)
        {
            var invoice = new Invoice()
            { 
                Id = id
            };

            repositoryManager.InvoiceRepository.Delete(invoice);
            repositoryManager.SaveChanges();

            return id;
        }

        #endregion
    }
}
