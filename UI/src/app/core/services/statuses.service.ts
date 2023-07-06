import { Injectable } from '@angular/core';
import { StatusModel } from '../models/inner/status.model';
import { Observable, ReplaySubject, map } from 'rxjs';
import { HttpService } from './utils/http.service';
import { MapperService } from '../mappers/mapper.service';
import { StatusInputModel } from '../models/input/status-input.model';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {
  private statuses: StatusModel[] | null = null;

  private statusesRSubject$: ReplaySubject<StatusModel[]> | null = null;

  //#region  constructor

  constructor(
    private http: HttpService,
    private mapper: MapperService
  ) { }

  //#endregion

  //#region events

  private get statuses$(): Observable<StatusModel[]> | null{
    return this.statusesRSubject$?.asObservable() || null;
  }

  //#endregion

  //#region public

  public getAll(isForce: boolean = false): Observable<StatusModel[]> {
    if(this.statuses$ && !isForce){
      return this.statuses$;
    }

    this.statusesRSubject$ = new ReplaySubject<StatusModel[]>();

    this.http.get<StatusInputModel[]>('/api/status').pipe(
      map((data) => {
        const statuses = this.mapper.mapArray(data, StatusInputModel, StatusModel);

        return statuses;
      })
    ).subscribe({
      next: (statuses) => {
        this.statuses = statuses;
        this.statusesRSubject$!.next(this.statuses);
      },
      error: (error) => {
        this.statusesRSubject$!.error(error);
      }
    });
    
    return this.statuses$!;
  }

  //#endregion
}
