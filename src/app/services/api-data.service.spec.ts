/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiDataService } from './api-data.service';

describe('Service: GetApiData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiDataService]
    });
  });

  it('should ...', inject([ApiDataService], (service: ApiDataService) => {
    expect(service).toBeTruthy();
  }));
});
