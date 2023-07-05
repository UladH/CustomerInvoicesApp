using AppDependencyInjection;
using FluentValidation.AspNetCore;
using WebApi.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDataAccessServices();
builder.Services.AddInfrastructureServices();
builder.Services.AddValidators();
builder.Services.AddDomainLayerServices();
builder.Services.AddAppLayerServices();

builder.Services.AddControllers().AddFluentValidation(fv => { });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseMiddleware<ResponseMapperMiddleware>();
app.UseAuthorization();
app.MapControllers();
app.Run();
