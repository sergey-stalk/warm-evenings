/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchPoemService } from './search-poem.service';

describe('Service: SearchPoem', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchPoemService]
    });
  });

  it('should ...', inject([SearchPoemService], (service: SearchPoemService) => {
    expect(service).toBeTruthy();
  }));
});
