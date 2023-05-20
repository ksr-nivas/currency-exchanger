import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SharedService {
    
    private isLoading: BehaviorSubject<any> = new BehaviorSubject(false);
    setLoader(value: boolean) {
        this.isLoading.next(value);
    }

    getLoader(): Observable<boolean> {
        return this.isLoading.asObservable();
    }

    private from: BehaviorSubject<any> = new BehaviorSubject('');
    setFrom(value: string) {
        this.from.next(value);
    }

    getFrom(): Observable<string> {
        return this.from.asObservable();
    }

    private to: BehaviorSubject<any> = new BehaviorSubject('');
    setTo(value: string) {
        this.to.next(value);
    }

    getTo(): Observable<string> {
        return this.to.asObservable();
    }

    private amount: BehaviorSubject<any> = new BehaviorSubject(0);
    setAmount(value: number) {
        this.amount.next(value);
    }

    getAmount(): Observable<number> {
        return this.amount.asObservable();
    }

    private symbols: BehaviorSubject<any> = new BehaviorSubject({});
    setSymbols(value: any) {
        this.symbols.next(value);
    }

    getSymbols(): Observable<any> {
        return this.symbols.asObservable();
    }
}