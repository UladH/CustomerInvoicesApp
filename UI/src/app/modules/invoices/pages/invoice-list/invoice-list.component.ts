import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { SmartComponentComponent } from 'src/app/core/components/_base/smart-components/smart-component/smart-component.component';
import { InvoiceListService } from './invoice-list.service';
import { InvoiceModel } from 'src/app/core/models/inner/invoice.model';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ci-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  providers: [InvoiceListService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceListComponent extends SmartComponentComponent {
  //#region constructor

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected override componentService: InvoiceListService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(changeDetectorRef, componentService);
  }

  //#endregion

  //#region getters setters

  public get invoices(): InvoiceModel[] | null {
    return this.componentService.invoices;
  }

  //#endregion

  //#region public

  public onDeleteHandler(id: number): void {
    this.confirmationService.confirm({
      message: `Please confirm the invoice #${id} deletion`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {        
        this.componentService.delete(id);
      }
    });
  }

  //#endregion
}
