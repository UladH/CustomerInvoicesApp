import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceFormComponent } from './forms/invoice-form/invoice-form.component';
import { WrapperModule } from 'acwrapper';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    InvoiceFormComponent
  ],
  imports: [
    CommonModule,    
    WrapperModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule
  ],
  exports: [
    InvoiceFormComponent
  ]
})
export class FeaturesModule { }
