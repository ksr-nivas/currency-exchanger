import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConvertedCurrency } from 'src/app/shared/models/converted-currency.model';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class CurrencyConverterService {

    baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }
    
    getAvailableCurrencySymbols() {
        return this.http.get('./assets/currencies.json');
    }

    convert(to: string, from: string, amount: number) {
        return this.http.get<IConvertedCurrency>(this.baseUrl+`/convert?to=${to}&from=${from}&amount=${amount}`);
    }
}