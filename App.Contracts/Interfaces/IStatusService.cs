using App.Contracts.Models.Output;

namespace App.Contracts.Interfaces
{
    public interface IStatusService
    {
        IEnumerable<StatusOutputModel> GetAll();
    }
}
