import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InvoicesComponent } from "./invoices.component";
import { InvoiceListComponent } from "./pages/invoice-list/invoice-list.component";

const routesChildren: Routes = [
    {
        path: '',
        component: InvoiceListComponent
    }
];
  
const routes: Routes = [
    { path: '', component: InvoicesComponent, children: routesChildren },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }