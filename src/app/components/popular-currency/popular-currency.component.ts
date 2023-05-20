import { KeyValue } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest, forkJoin, take } from 'rxjs';
import { CurrencyConverterService } from 'src/app/modules/currency-converter/services/currency-converter.service';
import { Constants } from 'src/app/shared/constants/constants';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-popular-currency',
  templateUrl: './popular-currency.component.html',
  styleUrls: ['./popular-currency.component.scss'],
})
export class PopularCurrencyComponent implements OnInit, OnDestroy {
  from!: string;
  amount!: number;

  popularCurrencySymbols: string[] = Constants.Popular_Currency_Symbols;
  popularCurrencies: any = {};
  from$!: Observable<string>;
  amount$!: Observable<number>;
  subscription!: Subscription;
  isLoading$!: Observable<boolean>;

  constructor(
    private currencyConverterService: CurrencyConverterService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.sharedService.getLoader();

    combineLatest({
      from: this.sharedService.getFrom(),
      amount: this.sharedService.getAmount(),
    }).subscribe(({ from, amount }) => {
      this.from = from;
      this.amount = amount;
      this.getPopularCurrencyConversions();
    });
  }

  getPopularCurrencyConversions() {
    if(!this.from || !this.amount) return;

    this.currencyConverterService
      .getPopularCurrencies(
        this.from,
        this.popularCurrencySymbols.toString()
      )
      .pipe(take(1))
      .subscribe((response) => {
        for(let rate in response.rates) {
          this.popularCurrencies[rate] = this.amount * response.rates[rate];
        }
      });
  }

  trackByFn(index: number, item: any) {
    return item.key;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
