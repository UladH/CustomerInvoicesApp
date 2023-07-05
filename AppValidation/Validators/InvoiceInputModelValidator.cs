using App.Contracts.Models.Input;
using FluentValidation;

namespace AppValidation.Validators
{
    public class InvoiceInputModelValidator : AbstractValidator<InvoiceInputModel>
    {
        public InvoiceInputModelValidator() 
        {
            RuleFor(p => p.Amount).GreaterThan(0);
        }
    }
}
