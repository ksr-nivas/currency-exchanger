import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit {

  title$!: Observable<string>;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.title$ = this.sharedService.getFrom();
  }

}
