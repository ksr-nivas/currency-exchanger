import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HomeComponent } from 'src/app/components/home/home.component';
import { CurrencyConverterComponent } from 'src/app/modules/currency-converter/currency-converter/currency-converter.component';
import { CurrencyDetailsComponent } from 'src/app/modules/currency-converter/currency-details/currency-details.component';
import { PopularCurrencyComponent } from 'src/app/components/popular-currency/popular-currency.component';
import { CurrencyRoutingModule } from './currency-converter-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HistoryChartComponent } from 'src/app/components/history-chart/history-chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    HomeComponent,
    CurrencyConverterComponent,
    PopularCurrencyComponent,
    CurrencyDetailsComponent,
    HistoryChartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSelectModule,
    CurrencyRoutingModule,
    NgChartsModule
  ],
})
export class CurrencyConverterModule {}
