import { Injectable } from '@angular/core';
import { ComponentState } from 'acwrapper';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { SmartComponentService } from 'src/app/core/components/_base/smart-components/smart-component/smart-component.service';
import { InvoiceModel } from 'src/app/core/models/inner/invoice.model';
import { InvoicesService } from 'src/app/core/services/invoices.service';

@Injectable()
export class InvoiceListService extends SmartComponentService {
  protected override _state: ComponentState = ComponentState.Loader;
  
  private _invoices: InvoiceModel[] | null = null;

  //#region constructor 

  constructor(
    private invoicesService: InvoicesService,
    private messageService: MessageService
  ) {
    super();
  }

  //#endregion

  //#region getters setters

  public get invoices(): InvoiceModel[] | null{
    return this._invoices;
  }

  private set invoices(value: InvoiceModel[] | null){
    this._invoices = value;
  }

  //#endregion

  //#region public

  public delete(id: number): void {
    this.state = ComponentState.Loader;

    this.invoicesService.delete(id).subscribe({
      next: (id: number) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `The invoice #${id} was successfully deleted` });
        this.state = ComponentState.Content;
      },
      error: (error) => this.state = ComponentState.Content
    });
  }

  //#endregion

  //#region protected

  protected onGetInvoicesUpdatedHandler(invoices: InvoiceModel[]): void {
    this.invoices = invoices;
    this.state = ComponentState.Content;
  }

  protected override addSubscriptions(): void {
    super.addSubscriptions();

    this.serviceSubscription.add(
      this.invoicesService.getAll(true).subscribe({
        next: this.onGetInvoicesUpdatedHandler.bind(this),
        error: () => this.state = ComponentState.Error
      })
    );
  }

  //#endregion
}
