using AppConfiguration;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Net;
using WebApi.Models;

namespace WebApi.Middlewares
{
    public class ResponseMapperMiddleware
    {
        private RequestDelegate next;

        #region constructor

        public ResponseMapperMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        #endregion

        #region public

        public async Task InvokeAsync(HttpContext context, IAppConfiguration appConfiguration, IWebHostEnvironment environment)
        {
            context.Response.ContentType = "application/json";

            var originBody = context.Response.Body;
            ErrorResponseModel error = null;

            using (var memStream = new MemoryStream())
            {
                context.Response.Body = memStream;

                try
                {
                    await next(context);

                    //parameter validation errors
                    if(context.Response.StatusCode == (int)HttpStatusCode.BadRequest)
                    {
                        var validationError = DeserializeFromStream(memStream);

                        throw new ValidationException("One or more validation errors occurred.");
                    }
                }
                catch (Exception exception)
                {
                    context.Response.StatusCode = GetStatusCodeByException(exception);

                    error = GetErrorModel(exception, environment);
                }

                var newBody = new ResponseModel()
                {
                    StatusCode = context.Response.StatusCode,
                    Data = DeserializeFromStream(memStream),
                    Error = error
                };

                WriteObjectToStream(newBody, memStream);
                await memStream.CopyToAsync(originBody).ConfigureAwait(false);
                context.Response.Body = originBody;
            }
        }

        #endregion

        #region private

        private ErrorResponseModel GetErrorModel(Exception exception, IWebHostEnvironment environment)
        {
            if (exception == null)
            {
                return null;
            }

            var errorModel = new ErrorResponseModel()
            {
                Code = GetErrorCodeByException(exception),
                Message = environment.IsDevelopment() ? exception.Message : "Something went wrong. Please repeat later",
                StackTrace = environment.IsDevelopment() ? exception.StackTrace : null
            };

            return errorModel;
        }

        private int GetStatusCodeByException(Exception exception)
        {

            switch (exception)
            {
                case DbUpdateConcurrencyException dbce:
                case DbUpdateException dbue:
                case ValidationException ve:
                case ArgumentException ae:
                    return (int)HttpStatusCode.BadRequest;
                case KeyNotFoundException e:
                    return (int)HttpStatusCode.NotFound;
                default:
                    return (int)HttpStatusCode.InternalServerError;
            }
        }

        private int? GetErrorCodeByException(Exception exception)
        {

            switch (exception)
            {
                case ValidationException ve:
                    return 0;
                default:
                    return null;
            }
        }

        private object DeserializeFromStream(MemoryStream memStream)
        {
            memStream.Position = 0;
            string objectString = new StreamReader(memStream).ReadToEnd();
            return JsonConvert.DeserializeObject<object>(objectString);
        }

        private void WriteObjectToStream(object model, MemoryStream stream)
        {
            var json = JsonConvert.SerializeObject(model);
            var streamWriter = new StreamWriter(stream);
            stream.SetLength(0);
            streamWriter.Write(json);
            streamWriter.Flush();
            stream.Position = 0;
        }

        #endregion
    }
}
