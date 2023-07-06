import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { SmartComponentComponent } from 'src/app/core/components/_base/smart-components/smart-component/smart-component.component';
import { InvoiceFormService } from './invoice-form.service';
import { FormGroup } from '@angular/forms';
import { StatusModel } from 'src/app/core/models/inner/status.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InvoiceFormInputModel } from 'src/app/core/models/input/invoice-form-input.model';

@Component({
  selector: 'ci-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent extends SmartComponentComponent {
  @Input() public title: string  = 'Invoice';

  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSubmit: EventEmitter<InvoiceFormInputModel> = new EventEmitter<InvoiceFormInputModel>();

  //#region constructor

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected override componentService: InvoiceFormService,    
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    super(changeDetectorRef, componentService);
  }

  //#endregion

  //#region getters setters

  public get form(): FormGroup {
    return this.componentService.form;
  }

  public get statuses(): StatusModel[] | null{
    return this.componentService.statuses;
  }
  
  //#endregion

  //#region public

  public onCancelHandler(): void{    
    this.confirmationService.confirm({
      message: 'Please Confirm',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {        
        this.onCancel.emit();
      }
    });
  }

  public onSubmitHandler(): void {
    if(this.form.invalid) {      
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Form is invalid"});
      return
    }

    this.confirmationService.confirm({
      message: 'Please confirm new invoice',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {       
         const invoice : InvoiceFormInputModel = {
          id: this.form.value.id,
          amount: this.form.value.amount,
          date: this.form.value.date,
          statusId: this.form.value.statusId,
         } 

         this.onSubmit.emit(invoice);
      }
    });
  }

  //#endregion
}
