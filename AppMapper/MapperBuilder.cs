using AppMapper.Profiles;
using AutoMapper;

namespace AppMapper
{
    public static class MapperBuilder
    {
        #region public

        public static IMapper Create()
        {
            var config = new MapperConfiguration(mc => {
                mc.AddProfile(new InvoiceProfile());
                mc.AddProfile(new StatusProfile());
            });

            return config.CreateMapper();
        }

        #endregion
    }
}
