using App.Contracts.Models.Output;
using AutoMapper;
using Domain.Contracts.Models;

namespace AppMapper.Profiles
{
    internal class StatusProfile : Profile
    {
        #region constructor

        public StatusProfile()
        {
            CreateMap<Status, StatusOutputModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
        }

        #endregion
    }
}
