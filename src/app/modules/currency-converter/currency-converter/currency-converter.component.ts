import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrencyConverterService } from '../services/currency-converter.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { IConvertedCurrency } from 'src/app/shared/models/converted-currency.model';
import { Router } from '@angular/router';

export interface FormModel {
  amount: FormControl<number | null>;
  from: FormControl<string | null | undefined>;
  to: FormControl<string | null | undefined>;
}

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  @Input() type: 'converter' | 'details' = 'converter';
  @Input() title: string | null = 'Currency Exchanger';
  currencyForm!: FormGroup<FormModel>;
  availableCurrencies = {};
  isLoading$!: Observable<boolean>;
  convertedResult!: IConvertedCurrency;
  canEnableDetails: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private sharedService: SharedService,
              private currencyConverterService: CurrencyConverterService) {}

  ngOnInit(): void {
    this.buildForm();
    this.getAvailableSymbols();
    this.isLoading$ = this.sharedService.getLoader();
  }

  private buildForm() {
    this.currencyForm = this.fb.group<FormModel>({
      amount: this.fb.control<number | null>(1, {validators: [Validators.required, Validators.min(1)]}),
      from: this.fb.control<string | null>('EUR'),
      to: this.fb.control<string | null>('USD'),
    });

    if(this.type === 'details') {
      this.sharedService.getFrom().pipe(take(1)).subscribe(from => {
        this.currencyForm.get('from')?.setValue(from);
        this.currencyForm.get('from')?.disable();
      })
      this.sharedService.getTo().pipe(take(1)).subscribe(to => {
        this.currencyForm.get('to')?.setValue(to);
      })
      this.sharedService.getSymbols().pipe(take(1)).subscribe((symbols: any) => {
        this.title = this.title && symbols[this.title];
      })
    }
  }

  private getAvailableSymbols() {
    this.currencyConverterService.getAvailableCurrencySymbols().subscribe((response: any) => {
      this.availableCurrencies = response.symbols;
      this.sharedService.setSymbols({...this.availableCurrencies});
    })
  }

  swap() {
    const {to, from} = this.currencyForm.value;
    this.currencyForm.get('from')?.setValue(to);
    this.currencyForm.get('to')?.setValue(from);
  }

  backToHome() {
    this.router.navigateByUrl('');
  }

  gotoDetailsPage() {
    this.router.navigateByUrl('details');
  }

  convert() {
    const {to, from, amount} = this.currencyForm.value;
    if(!to || !from || !amount) {
      return;
    }

    this.canEnableDetails = true;
    this.sharedService.setTo(to);
    this.sharedService.setFrom(from);
    this.sharedService.setAmount(amount);
    
    this.currencyConverterService.convert(to, from, amount)
        .pipe(
          take(1)
        )
        .subscribe(response => {
          this.convertedResult = response;
        })
  }
}
