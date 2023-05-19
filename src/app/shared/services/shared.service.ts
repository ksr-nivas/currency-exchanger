import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SharedService {
    
    private isLoading: BehaviorSubject<any> = new BehaviorSubject(false);
    setLoading(value: boolean) {
        this.isLoading.next(value);
    }

    getLoading() {
        return this.isLoading.asObservable();
    }
}