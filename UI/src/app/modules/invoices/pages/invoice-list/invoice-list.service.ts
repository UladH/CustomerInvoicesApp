import { Injectable } from '@angular/core';
import { ComponentState } from 'acwrapper';
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
    private invoicesService: InvoicesService
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
