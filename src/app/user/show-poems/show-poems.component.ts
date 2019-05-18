import { ApiDataService } from './../../services/api-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-poems',
  templateUrl: './show-poems.component.html',
  styleUrls: ['./show-poems.component.css']
})
export class ShowPoemsComponent implements OnInit {

  constructor(private apiDataService: ApiDataService) { }

  dataPoems;
  wayOfPoems = [];
  history = [];
  scrin = 'autor';
  poems;


  ngOnInit() {
    this.apiDataService.getPoems().subscribe((data) => {
      this.dataPoems = data;
    });
  }
  showPoemsList(i) {
    this.scrin = 'poemsList';
    this.wayOfPoems.push(this.dataPoems[i].name);
    this.history.push(i);
    console.log(this.dataPoems[this.history[0]].poems);
  }

  showPoem(i) {
    this.scrin = '';
    this.wayOfPoems.push(this.dataPoems[this.history[0]].poems[i].poemName);
    this.history.push(i);
    this.scrin = 'poem';
  }

  back() {
    if (this.wayOfPoems.length !== 0) {
      this.wayOfPoems.length = this.wayOfPoems.length - 1;
    }
    if (this.wayOfPoems.length === 0) {
      this.scrin = 'autor';
    }
    if (this.wayOfPoems.length === 1) {
      this.scrin = 'poemsList';
    }
    this.history.length = this.history.length - 1;
  }
}
