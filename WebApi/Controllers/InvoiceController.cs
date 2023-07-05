using App.Contracts.Interfaces;
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

        #endregion

        //// GET api/<InvoiceController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<InvoiceController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<InvoiceController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<InvoiceController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
