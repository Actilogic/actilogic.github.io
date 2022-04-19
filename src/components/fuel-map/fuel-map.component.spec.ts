import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelMapComponent } from './fuel-map.component';

describe('FuelMapComponent', () => {
  let component: FuelMapComponent;
  let fixture: ComponentFixture<FuelMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
