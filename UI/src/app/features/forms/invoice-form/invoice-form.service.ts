import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentState } from 'acwrapper';
import { SmartComponentService } from 'src/app/core/components/_base/smart-components/smart-component/smart-component.service';
import { InvoiceModel } from 'src/app/core/models/inner/invoice.model';
import { StatusModel } from 'src/app/core/models/inner/status.model';
import { StatusesService } from 'src/app/core/services/statuses.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceFormService extends SmartComponentService {
  protected override _state: ComponentState = ComponentState.Loader;
  
  private _invoice: InvoiceModel | null = null;
  private _form: FormGroup | null = null;
  private _statuses: StatusModel[] | null = null;
  
  //#region constructor 

  constructor(
    private statusesService: StatusesService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  //#endregion

  //#region lifecycle hooks

  public override ngOnInit(): void {
    super.ngOnInit();

    this.form = this.formBuilder.group({
      id: [this.invoice?.id || null],
      statusId: [this.invoice?.statusId || 1, [Validators.required, Validators.min(1)]],
      date: [this.invoice?.date || new Date(), Validators.required],
      amount: [this.invoice?.amount || 0, [Validators.required, Validators.min(0)]]
    });
  }

  //#endregion

  //#region getters setters

  public get statuses(): StatusModel[] | null{
    return this._statuses;
  }

  private set statuses(value: StatusModel[] | null){
    this._statuses = value;
  }

  public get form(): FormGroup | null{
    return this._form;
  }

  private set form(value: FormGroup){
    this._form = value;
  }

  public get invoice(): InvoiceModel | null{
    return this._invoice;
  }

  public set invoice(value: InvoiceModel | null){
    this._invoice = value;

    if(!this.form){
      return;
    }

    this.patchForm(this.invoice);
  }

  //#endregion

  //#region protected

  protected onGetStatusesUpdatedHandler(statuses: StatusModel[]): void {
    this.statuses = statuses;
    this.state = ComponentState.Content;
  }

  protected override addSubscriptions(): void {
    super.addSubscriptions();

    this.serviceSubscription.add(
      this.statusesService.getAll(true).subscribe({
        next: this.onGetStatusesUpdatedHandler.bind(this),
        error: () => this.state = ComponentState.Error
      })
    );
  }

  //#endregion

  //#region private

  private patchForm(invoice: InvoiceModel | null): void {
    this.form?.patchValue({
      id: invoice?.id || null,
      amount: invoice?.amount || 1,
      date: invoice?.date || new Date(),
      statusId: invoice?.statusId || 1
    })
  }

  //#endregion
}
