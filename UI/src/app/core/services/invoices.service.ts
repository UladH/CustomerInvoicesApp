import { Injectable } from '@angular/core';
import { HttpService } from './utils/http.service';
import { Observable, ReplaySubject, map, tap } from 'rxjs';
import { InvoiceInputModel } from '../models/input/invoice-input.model';
import { InvoiceModel } from '../models/inner/invoice.model';
import { MapperService } from '../mappers/mapper.service';

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

  //#endregion
}
