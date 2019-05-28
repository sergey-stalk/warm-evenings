import { SearchPoemService } from './../../services/search-poem.service';
import { SearchAutorService } from './../../services/search-autor.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CatchDataService } from './../../services/catch-data.service';
import { ApiDataService } from './../../services/api-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-poems',
  templateUrl: './show-poems.component.html',
  styleUrls: ['./show-poems.component.css']
})
export class ShowPoemsComponent implements OnInit {

  constructor(
    private apiDataService: ApiDataService,
    private catchDataService: CatchDataService,
    private searchAutorService: SearchAutorService,
    private searchPoemService: SearchPoemService
  ) { }

  dataPoems;
  wayOfPoems = [];
  history = [];
  scrin = 'autor';
  poems;
  dataView;
  searchAutor: FormGroup;
  searchPoem: FormGroup;
  pointer;
  poemPointer;


  ngOnInit() {
    if (localStorage.poems) {
      this.dataPoems = this.catchDataService.getCatchItem('poems');
      this.dataView = this.catchDataService.getCatchItem('poems');
    } else {
      this.apiDataService.getPoems().subscribe((poems) => {
        this.dataPoems = poems;
        this.dataView = poems;
        this.catchDataService.updateCatch('poems', poems);
      });
    }

    this.searchAutor = new FormGroup({
      autor: new FormControl()
    });
    this.searchAutor.valueChanges.subscribe((changes) => {
      this.dataView = this.searchAutorService.sortByAutorName(changes.autor);
    });

    this.searchPoem = new FormGroup({
      poem: new FormControl()
    });

    this.searchPoem.valueChanges.subscribe((changes) => {
      this.dataView = this.searchPoemService.searchByPoemName(changes.poem, this.pointer);
    });


  }

  showPoemsList(item) {
    this.dataPoems.map((el, i) => {
      if (el.name === item) {
        this.pointer = i;
      }
    });
    this.scrin = 'poemsList';
    this.wayOfPoems.push(this.dataPoems[this.pointer].name);
    this.history.push(this.pointer);
    console.log(this.dataPoems[this.history[0]].poems);
  }

  showPoem(item) {
    this.dataPoems[this.pointer].poems.map((el, i) => {
      if (el.poemName === item) {
        this.poemPointer = i;
      }
    });
    this.scrin = '';
    this.wayOfPoems.push(this.dataPoems[this.history[0]].poems[this.poemPointer].poemName);
    this.history.push(this.poemPointer);
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
