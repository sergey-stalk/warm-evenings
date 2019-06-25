import { Injectable } from '@angular/core';
import { CatchDataService } from './catch-data.service';

@Injectable()

export class SearchAutorService {

constructor(private catchDataService: CatchDataService) { }

  sortByAutorName(searchValue) {
    console.log(searchValue);
    if (searchValue === '') {
      return this.catchDataService.getCatchItem('poems');
    } else {
      const sortedData = this.catchDataService.getCatchItem('poems');
      return sortedData.filter((el) => {
        if (el.name.toLowerCase().includes(searchValue.toLowerCase())) {
          return el;
        }
      });
    }
  }
}
