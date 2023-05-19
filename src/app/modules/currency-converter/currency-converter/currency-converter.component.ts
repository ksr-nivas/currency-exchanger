import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrencyConverterService } from '../services/currency-converter.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { IConvertedCurrency } from 'src/app/shared/models/converted-currency.model';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  currencyForm!: FormGroup;
  availableCurrencies = {};
  isLoading$!: Observable<boolean>;
  convertedResult!: IConvertedCurrency;

  constructor(private fb: FormBuilder,
              private sharedService: SharedService,
              private currencyConverterService: CurrencyConverterService) {}

  ngOnInit(): void {
    this.buildForm();
    this.getAvailableSymbols();
    this.isLoading$ = this.sharedService.getLoading();
  }

  private buildForm() {
    this.currencyForm = this.fb.group({
      amount: [1, [Validators.required, Validators.min(1)]],
      from: 'EUR',
      to: 'USD',
    });
  }

  private getAvailableSymbols() {
    this.currencyConverterService.getAvailableCurrencySymbols().subscribe(res => {
      this.availableCurrencies = res;
    })
  }

  swap() {
    const {to, from} = this.currencyForm.value;
    this.currencyForm.get('from')?.setValue(to);
    this.currencyForm.get('to')?.setValue(from);
  }

  convert() {
    const {to, from, amount} = this.currencyForm.value;
    if(!to || !from || !amount) {
      return;
    }
    this.currencyConverterService.convert(to, from, amount)
        .pipe(
          take(1)
        )
        .subscribe(response => {
          this.convertedResult = response;
        })
  }
}
