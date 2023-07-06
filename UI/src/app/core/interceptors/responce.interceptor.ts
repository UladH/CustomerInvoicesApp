import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ResponceInterceptor implements HttpInterceptor {

  //#region constructor

  constructor(
    private messageService: MessageService
  ) {}

  //#endregion

  //#region public

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((requestError: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: requestError.error.Error.Message });
        throw throwError(() => requestError);
      }),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            event = event.clone({ body: event.body.Data })
        }
        return event;
      })
    );
  }

  //#endregion
}
