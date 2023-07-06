import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentState } from 'acwrapper';
import { SmartComponentService } from 'src/app/core/components/_base/smart-components/smart-component/smart-component.service';
import { StatusModel } from 'src/app/core/models/inner/status.model';
import { StatusesService } from 'src/app/core/services/statuses.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceFormService extends SmartComponentService {
  protected override _state: ComponentState = ComponentState.Loader;
  
  private _form: FormGroup = new FormGroup({});
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
      id: [null],
      statusId: [1, [Validators.required, Validators.min(1)]],
      date: [new Date(), Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]]
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

  public get form(): FormGroup{
    return this._form;
  }

  private set form(value: FormGroup){
    this._form = value;
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
}
