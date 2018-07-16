import { TestBed, inject } from '@angular/core/testing';

import { InfluxDataService } from './influx-data.service';

describe('InfluxDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfluxDataService]
    });
  });

  it('should be created', inject([InfluxDataService], (service: InfluxDataService) => {
    expect(service).toBeTruthy();
  }));
});
