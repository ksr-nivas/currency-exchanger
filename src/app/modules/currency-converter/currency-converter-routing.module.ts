import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'details',
    component: CurrencyDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }