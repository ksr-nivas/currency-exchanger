import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConvertedCurrency } from 'src/app/shared/models/converted-currency.model';
import { IPopularCurrency } from 'src/app/shared/models/popular-currency-model';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class CurrencyConverterService {

    baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }
    
    getAvailableCurrencySymbols() {
        return this.http.get(this.baseUrl+`/symbols`);
    }

    getPopularCurrencies(from: string, popularSymbols: string) {
        return this.http.get<IPopularCurrency>(this.baseUrl+`/latest?symbols=${popularSymbols}&base=${from}`);
    }

    convert(to: string, from: string, amount: number) {
        return this.http.get<IConvertedCurrency>(this.baseUrl+`/convert?to=${to}&from=${from}&amount=${amount}`);
    }

    getTimeSeries(startDate: string, endDate: string, symbols: string) {
        return this.http.get(this.baseUrl+`/timeseries?start_date=${startDate}&end_date=${endDate}&symbols=${symbols}`)
    }
}