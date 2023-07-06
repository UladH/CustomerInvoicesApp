import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentState } from 'acwrapper';
import { MessageService } from 'primeng/api';
import { SmartComponentService } from 'src/app/core/components/_base/smart-components/smart-component/smart-component.service';
import { InvoiceModel } from 'src/app/core/models/inner/invoice.model';
import { InvoiceFormInputModel } from 'src/app/core/models/input/invoice-form-input.model';
import { InvoicesService } from 'src/app/core/services/invoices.service';

@Injectable()
export class EditInvoiceService extends SmartComponentService  {
  protected override _state: ComponentState = ComponentState.Loader;

  private _invoice: InvoiceModel | null = null;

  //#region constructor 

  constructor(
    private invoicesService: InvoicesService,
    private router: Router,
    private messageService: MessageService
  ) {
    super();
  }

  //#endregion

  //#region getters setters

  public get invoice(): InvoiceModel | null {
    return this._invoice;
  }

  private set invoice(value: InvoiceModel | null) {
    this._invoice = value;
  }

  //#endregion

  //#region public

  public get(id: number): void {
    this.state = ComponentState.Loader;

    this.invoicesService.get(id).subscribe({
      next: (invoice) =>{
        this.invoice = invoice;
        this.state = ComponentState.Content;
      },
      error: (error) =>{
        this.state = ComponentState.Error;
      }
    });
  }

  public save(invoice: InvoiceFormInputModel): void {
    this.state = ComponentState.Loader;

    this.invoicesService.update(invoice).subscribe({
      next: (invoice) =>{        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `The invoice #${invoice.id} was successfully updated` });
        this.router.navigate(["../"]);
      },
      error: () =>{
        this.state = ComponentState.Content;
      }
    });
  }

  //#endregion
}
