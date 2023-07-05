﻿using AppConfiguration;
using AppDbContext;
using Domain.Contracts.Interfaces;
using Domain.Contracts.Interfaces.Repositories;
using Domain.Repositories;
using Domain.Repositories.Repositories;
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
        }

        public static void AddDomainLayerServices(this IServiceCollection services)
        {
            services.AddTransient<IInvoiceRepository, InvoiceRepository>();
            services.AddTransient<IRepositoryManager, RepositoryManager>();
        }

        public static void AddAppLayerServices(this IServiceCollection services)
        {
        }

        #endregion
    }
}