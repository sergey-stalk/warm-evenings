/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CatchDataService } from './catch-data.service';

describe('Service: CatchData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatchDataService]
    });
  });

  it('should ...', inject([CatchDataService], (service: CatchDataService) => {
    expect(service).toBeTruthy();
  }));
});
