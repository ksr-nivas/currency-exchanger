import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Observable, take, combineLatest } from 'rxjs';
import { CurrencyConverterService } from 'src/app/modules/currency-converter/services/currency-converter.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {

  from!: string;
  to!: string;
  isLoading$!: Observable<boolean>;

  readonly MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.MONTHS,
    datasets: [
      {
        label: 'D1',
        data:  [],
        borderColor: 'yellow',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
      {
        label: 'D2',
        data:  [],
        borderColor: 'white',
        backgroundColor: 'rgba(255,0,0,0.3)',
      }
    ]
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  lineChartLegend = true;

  constructor(private sharedService: SharedService, private currencyConverterService: CurrencyConverterService) { }

  ngOnInit(): void {
    this.isLoading$ = this.sharedService.getLoader();

    combineLatest({
      from: this.sharedService.getFrom(),
      to: this.sharedService.getTo(),
    }).subscribe(({ from, to }) => {
      this.from = from;
      this.to = to;
      this.lineChartData.datasets[0].label = from;
      this.lineChartData.datasets[1].label = to;
      this.getHistory();
    });
  }

  getHistory() {
    if(!this.from || !this.to) return;

    const date = new Date();
    const startDate = `${date.getFullYear() - 1}-0${date.getMonth()+1}-${date.getDate() - 2}`;
    const endDate = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate() - 1}`;
    const symbols = `${this.from},${this.to}`;
    
    this.currencyConverterService
      .getTimeSeries(startDate, endDate, symbols)
      .pipe(take(1))
      .subscribe((response: any) => {
        if(!response.success) return;

        const data = new Map();
        for (let date in response.rates) {
          data.set(this.MONTHS[new Date(date).getMonth()], response.rates[date]);
        }
        for(let val of data.values()) {
          this.lineChartData.datasets[0].data.push(val[this.from])
          this.lineChartData.datasets[1].data.push(val[this.to])
        }

        this.lineChartData.labels = Array.from(data.keys());
      });
  }

}
