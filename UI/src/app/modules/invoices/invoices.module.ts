import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { WrapperModule } from 'acwrapper';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoicesComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    WrapperModule,
    TableModule,
    ButtonModule
  ]
})
export class InvoicesModule { }