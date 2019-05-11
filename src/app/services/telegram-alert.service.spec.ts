/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TelegramAlertService } from './telegram-alert.service';

describe('Service: TelegramAlert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TelegramAlertService]
    });
  });

  it('should ...', inject([TelegramAlertService], (service: TelegramAlertService) => {
    expect(service).toBeTruthy();
  }));
});
