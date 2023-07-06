import { ChangeDetectorRef, Component } from '@angular/core';
import { SmartComponentComponent } from 'src/app/core/components/_base/smart-components/smart-component/smart-component.component';
import { CreateInvoiceService } from './create-invoice.service';
import { Router } from '@angular/router';
import { InvoiceFormInputModel } from 'src/app/core/models/input/invoice-form-input.model';

@Component({
  selector: 'ci-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent extends SmartComponentComponent {
  //#region constructor

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected override componentService: CreateInvoiceService,
    private router: Router
  ) {
    super(changeDetectorRef, componentService);
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
}
