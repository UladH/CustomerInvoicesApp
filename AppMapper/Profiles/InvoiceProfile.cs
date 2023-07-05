using App.Contracts.Models.Output;
using AutoMapper;
using Domain.Contracts.Models;

namespace AppMapper.Profiles
{
    internal class InvoiceProfile: Profile
    {
        #region constructor

        public InvoiceProfile()
        {
            CreateMap<Invoice, InvoiceOutputModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
                .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => src.StatusId))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.Name));
        }

        #endregion
    }
}
