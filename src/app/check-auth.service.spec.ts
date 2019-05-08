/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CheckAuthService } from './check-auth.service';

describe('Service: CheckAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckAuthService]
    });
  });

  it('should ...', inject([CheckAuthService], (service: CheckAuthService) => {
    expect(service).toBeTruthy();
  }));
});
