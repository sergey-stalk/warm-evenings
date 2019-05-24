import { Injectable } from '@angular/core';

@Injectable()
export class CatchDataService {

constructor() { }
  catch(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  updateCatch(name, data) {
    this.catch(name, data);
  }

  getCatchItem(name) {
    return JSON.parse(localStorage.getItem(name));
  }


  clear() {
    localStorage.removeItem('poems');
    localStorage.removeItem('meeting');
    localStorage.removeItem('settings');
  }
}
