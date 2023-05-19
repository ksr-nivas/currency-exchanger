import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCurrencyComponent } from './popular-currency.component';

describe('PopularCurrencyComponent', () => {
  let component: PopularCurrencyComponent;
  let fixture: ComponentFixture<PopularCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
