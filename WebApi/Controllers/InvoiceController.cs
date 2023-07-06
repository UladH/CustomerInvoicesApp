using App.Contracts.Interfaces;
using App.Contracts.Models.Input;
using Microsoft.AspNetCore.Mvc;


namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private IInvoiceService invoiceService;

        #region constructor

        public InvoiceController(IInvoiceService invoiceService)
        {
            this.invoiceService = invoiceService;
        }

        #endregion

        #region public

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = invoiceService.GetAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult Get(uint id)
        {
            var result = invoiceService.Get(id);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Add([FromBody] InvoiceInputModel invoice)
        {
            var result = invoiceService.Add(invoice);
            return Ok(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] InvoiceInputModel invoice)
        {
            var result = invoiceService.Update(invoice);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(uint id)
        {
            var result = invoiceService.Delete(id);
            return Ok(result);
        }

        #endregion
    }
}
