import { Injectable } from '@angular/core';
import { HttpService } from './utils/http.service';
import { Observable, ReplaySubject, map, tap } from 'rxjs';
import { InvoiceInputModel } from '../models/input/invoice-input.model';
import { InvoiceModel } from '../models/inner/invoice.model';
import { MapperService } from '../mappers/mapper.service';
import { InvoiceFormInputModel } from '../models/input/invoice-form-input.model';
import { InvoiceOutputModel } from '../models/output/invoice-output.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private invoices: InvoiceModel[] | null = null;

  private invoicesRSubject$: ReplaySubject<InvoiceModel[]> | null = null;

  //#region  constructor

  constructor(
    private http: HttpService,
    private mapper: MapperService
  ) { }

  //#endregion

  //#region events

  private get invoices$(): Observable<InvoiceModel[]> | null{
    return this.invoicesRSubject$?.asObservable() || null;
  }

  //#endregion

  //#region public

  public get(id: number): Observable<InvoiceModel> {
    return this.http.get<InvoiceInputModel>(`/api/invoice/${id}`).pipe(
      map((data) => {
        const invoice = this.mapper.map(data, InvoiceInputModel, InvoiceModel);

        return invoice;
      })
    );
  }

  public getAll(isForce: boolean = false): Observable<InvoiceModel[]> {
    if(this.invoices$ && !isForce){
      return this.invoices$;
    }

    this.invoicesRSubject$ = new ReplaySubject<InvoiceModel[]>();

    this.http.get<InvoiceInputModel[]>('/api/invoice').pipe(
      map((data) => {
        const invoices = this.mapper.mapArray(data, InvoiceInputModel, InvoiceModel);

        return invoices;
      })
    ).subscribe({
      next: (invoices) => {
        this.invoices = invoices;
        this.invoicesRSubject$!.next(this.invoices);
      },
      error: (error) => {
        this.invoicesRSubject$!.error(error);
      }
    });
    
    return this.invoices$!;
  }

  public delete(id: number): Observable<number> {
    return this.http.delete<number>(`/api/invoice/${id}`).pipe(
      tap((id: number) => {
        this.invoices = this.invoices!.filter((invoice) => invoice.id != id)
        this.invoicesRSubject$!.next(this.invoices);
      })
    )
  }

  public create(invoice: InvoiceFormInputModel): Observable<InvoiceModel> {    
    let invoiceOutputModel = this.mapper.map(invoice, InvoiceFormInputModel, InvoiceOutputModel);

    return this.http.post<InvoiceInputModel>(`/api/invoice`, invoiceOutputModel as any).pipe(
      map((data: InvoiceInputModel) => {
        const invoice = this.mapper.map(data, InvoiceInputModel, InvoiceModel);

        return invoice;
      }),
      tap((invoice: InvoiceModel) => {
        this.invoices!.push(invoice);
        this.invoicesRSubject$!.next(this.invoices!);
      })
    )
  }

  public update(invoice: InvoiceFormInputModel): Observable<InvoiceModel> {    
    let invoiceOutputModel = this.mapper.map(invoice, InvoiceFormInputModel, InvoiceOutputModel);

    return this.http.put<InvoiceInputModel>(`/api/invoice`, invoiceOutputModel as any).pipe(
      map((data: InvoiceInputModel) => {
        const invoice = this.mapper.map(data, InvoiceInputModel, InvoiceModel);

        return invoice;
      }),
      tap((invoice: InvoiceModel) => {
        const index = this.invoices!.findIndex((elem) => elem.id == invoice.id);
        this.invoices![index] = invoice;
        this.invoicesRSubject$!.next(this.invoices!);
      })
    )
  }


  //#endregion
}
