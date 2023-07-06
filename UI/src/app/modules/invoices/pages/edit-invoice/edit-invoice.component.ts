import { ChangeDetectorRef, Component } from '@angular/core';
import { SmartComponentComponent } from 'src/app/core/components/_base/smart-components/smart-component/smart-component.component';
import { EditInvoiceService } from './edit-invoice.service';
import { InvoiceFormInputModel } from 'src/app/core/models/input/invoice-form-input.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InvoiceModel } from 'src/app/core/models/inner/invoice.model';

@Component({
  selector: 'ci-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss'],
  providers: [EditInvoiceService]
})
export class EditInvoiceComponent extends SmartComponentComponent {
  //#region constructor

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected override componentService: EditInvoiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(changeDetectorRef, componentService);
  }

  //#endregion

  //#region getters setters 
  
  public get invoice(): InvoiceModel | null {
    return this.componentService.invoice;
  }

  public get title(): string {
    return `Invoice #${this.invoice?.id}`
  }

  //#endregion

  //#region public

  public onSubmitHandler(invoice: InvoiceFormInputModel): void {
    this.componentService.save(invoice);
  }

  public onCancelHandler(): void {  
    this.router.navigate(["./"]);
  }

  //#endregion

  //#region protected

  protected onRouteParamHandler(params: Params): void {
    const id = parseInt(params['id']);
    this.componentService.get(id);
  }

  protected override addSubscriptions(): void {
    super.addSubscriptions();

    this.componentSubscriptions.add(
      this.route.params.subscribe(this.onRouteParamHandler.bind(this))
    );
  }

  //#endregion
}
