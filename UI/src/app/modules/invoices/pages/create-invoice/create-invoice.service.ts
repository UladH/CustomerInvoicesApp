import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentState } from 'acwrapper';
import { MessageService } from 'primeng/api';
import { SmartComponentService } from 'src/app/core/components/_base/smart-components/smart-component/smart-component.service';
import { InvoiceFormInputModel } from 'src/app/core/models/input/invoice-form-input.model';
import { InvoicesService } from 'src/app/core/services/invoices.service';

@Injectable({
  providedIn: 'root'
})
export class CreateInvoiceService extends SmartComponentService {
  //#region constructor 

  constructor(
    private invoicesService: InvoicesService,
    private router: Router,
    private messageService: MessageService
  ) {
    super();
  }

  //#endregion

  //#region public

  public save(invoice: InvoiceFormInputModel): void {
    this.state = ComponentState.Loader;

    this.invoicesService.create(invoice).subscribe({
      next: (invoice) =>{        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `The invoice #${invoice.id} was successfully created` });
        this.router.navigate(["../"]);
      },
      error: () =>{
        this.state = ComponentState.Content;
      }
    });
  }

  //#endregion

}
