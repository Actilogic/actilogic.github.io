import { TestBed } from '@angular/core/testing';

import { FuelWatchService } from './fuel-watch.service';

describe('FuelWatchService', () => {
  let service: FuelWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
