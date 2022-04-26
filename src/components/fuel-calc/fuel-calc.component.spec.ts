import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelCalcComponent } from './fuel-calc.component';

describe('FuelCalcComponent', () => {
  let component: FuelCalcComponent;
  let fixture: ComponentFixture<FuelCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
