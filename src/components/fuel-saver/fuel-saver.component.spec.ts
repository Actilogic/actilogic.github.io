import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelSaverComponent } from './fuel-saver.component';

describe('FuelSaverComponent', () => {
  let component: FuelSaverComponent;
  let fixture: ComponentFixture<FuelSaverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelSaverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
