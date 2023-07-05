using App.Contracts.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private IStatusService statusService;

        #region constructor

        public StatusController(IStatusService statusService) 
        {
            this.statusService = statusService;
        }

        #endregion

        #region public

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = statusService.GetAll();
            return Ok(result);
        }
        #endregion
    }
}
