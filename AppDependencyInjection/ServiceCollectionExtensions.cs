using App.Contracts.Interfaces;
using App.Services.Services;
using AppConfiguration;
using AppDbContext;
using AppMapper;
using AppValidation.Validators;
using Domain.Contracts.Interfaces;
using Domain.Contracts.Interfaces.Repositories;
using Domain.Repositories;
using Domain.Repositories.Repositories;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace AppDependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        #region public 

        public static void AddDataAccessServices(this IServiceCollection services)
        {
            services.AddDbContext<AppDbContext.AppDbContext>();
            services.AddScoped<IAppDbContext>(sp => sp.GetRequiredService<AppDbContext.AppDbContext>());
        }

        public static void AddInfrastructureServices(this IServiceCollection services)
        {
            services.AddScoped<IAppConfiguration, AppConfiguration.AppConfiguration>();
            services.AddSingleton(MapperBuilder.Create());
        }

        public static void AddValidators(this IServiceCollection services)
        {
            services.AddValidatorsFromAssemblyContaining<InvoiceInputModelValidator>();
        }

        public static void AddDomainLayerServices(this IServiceCollection services)
        {
            services.AddTransient<IInvoiceRepository, InvoiceRepository>();
            services.AddTransient<IStatusRepository, StatusRepository>();
            services.AddTransient<IRepositoryManager, RepositoryManager>();
        }

        public static void AddAppLayerServices(this IServiceCollection services)
        {
            services.AddTransient<IStatusService, StatusService>();
            services.AddTransient<IInvoiceService, InvoiceService>();
        }

        #endregion
    }
}
