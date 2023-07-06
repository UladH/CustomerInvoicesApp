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

  public post<T>(url: string,  payload?: { [key: string]: string | boolean | number}): Observable<T> {
    return this.http.post<T>(url, payload);
  }

  public put<T>(url: string,  payload?: { [key: string]: string | boolean | number}): Observable<T> {
    return this.http.put<T>(url, payload);
  }

  public delete<T>(url: string,  payload?: { [key: string]: string | boolean | number}): Observable<T> {
    return this.http.delete<T>(url, {
      body: payload
    });
  }

  //#endregion
}
