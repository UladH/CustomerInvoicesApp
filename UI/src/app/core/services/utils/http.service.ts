import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //#region constructor

  constructor(
    private http: HttpClient
  ) { }

  //#endregion

  //#region public

  public get<T>(url: string,  payload?: { [key: string]: string | boolean | number}): Observable<T> {
    return this.http.get<T>(url, {
      params: payload
    });
  }

  //#endregion
}
