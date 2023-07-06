import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { WrapperModule } from 'acwrapper';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CreateInvoiceComponent } from './pages/create-invoice/create-invoice.component';
import { FeaturesModule } from 'src/app/features/features.module';
import { EditInvoiceComponent } from './pages/edit-invoice/edit-invoice.component';



@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoicesComponent,
    CreateInvoiceComponent,
    EditInvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    WrapperModule,
    TableModule,
    ButtonModule,
    FeaturesModule
  ]
})
export class InvoicesModule { }
