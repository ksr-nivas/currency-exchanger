import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, of, finalize } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SharedService } from '../services/shared.service';

@Injectable()
export class CurrencyInterceptor implements HttpInterceptor {
    cache: Map<string, any> = new Map();
    constructor(private sharedService: SharedService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.sharedService.setLoading(true);
        if(req.method !== "GET") {
            return next.handle(req).pipe(finalize(() => this.sharedService.setLoading(false)));
        }
        const cachedResponse: HttpResponse<any> = this.cache.get(req.urlWithParams)
        if(cachedResponse) {
            this.sharedService.setLoading(false);
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
                }),
                finalize(() => this.sharedService.setLoading(false))
            );
        }
    }
}