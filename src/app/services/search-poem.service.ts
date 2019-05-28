import { CatchDataService } from './catch-data.service';
import { Injectable } from '@angular/core';

@Injectable()

export class SearchPoemService {

constructor(private catchDataService: CatchDataService) { }
  searchByPoemName(searchValue, pointer) {
    if (searchValue === '') {
      return this.catchDataService.getCatchItem('poems');
    } else {
      console.log(searchValue, pointer);
      const sortedData = this.catchDataService.getCatchItem('poems');
      sortedData[pointer].poems = sortedData[pointer].poems.filter((el) => {
        if (el.poemName.toLowerCase().includes(searchValue.toLowerCase())) {
          return el;
        }
      });
      return sortedData;
    }
  }
}
