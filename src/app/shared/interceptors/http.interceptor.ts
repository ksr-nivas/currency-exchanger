import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class CurrencyInterceptor implements HttpInterceptor {
    cache: Map<string, any> = new Map();
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.method !== "GET") {
            return next.handle(req)
        }
        const cachedResponse: HttpResponse<any> = this.cache.get(req.urlWithParams)
        if(cachedResponse) {
            return of(cachedResponse.clone());
        } else {
            const headers = req.headers
            .set('apikey', environment.FIXER_API_KEY)
            .set('Content-Type', 'application/json');

            const authReq = req.clone({ headers });
            return next.handle(authReq).pipe(  
                tap(event => {  
                  if (event instanceof HttpResponse) {  
                    this.cache.set(req.urlWithParams, event);  
                  }  
                }),
                catchError((error) => {
                    console.log(error);
                    return EMPTY;
                })
            );
        }
    }
}