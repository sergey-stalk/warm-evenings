/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchAutorService } from './search-autor.service';

describe('Service: SearchAutor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchAutorService]
    });
  });

  it('should ...', inject([SearchAutorService], (service: SearchAutorService) => {
    expect(service).toBeTruthy();
  }));
});
