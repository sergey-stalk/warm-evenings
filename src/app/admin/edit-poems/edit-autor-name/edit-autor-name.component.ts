import { SearchAutorService } from './../../../services/search-autor.service';
import { CatchDataService } from './../../../services/catch-data.service';
import { ApiDataService } from 'src/app/services/api-data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-autor-name',
  templateUrl: './edit-autor-name.component.html',
  styleUrls: ['./edit-autor-name.component.css']
})
export class EditAutorNameComponent implements OnInit {

  constructor(
    private apiDataService: ApiDataService,
    private catchDataService: CatchDataService,
    private searchAutorService: SearchAutorService
  ) { }

  autor: FormGroup;
  dataPoems;
  pointer;
  searchForm: FormGroup;
  isEdit = false;
  dataView;

  ngOnInit() {
    if (localStorage.poems) {
      this.dataPoems = this.catchDataService.getCatchItem('poems');
      this.dataView = this.catchDataService.getCatchItem('poems');
    } else {
      this.apiDataService.getPoems().subscribe((poems) => {
        this.dataPoems = poems;
        this.catchDataService.updateCatch('poems', poems);
        this.dataView = poems;
      });
    }
    this.searchForm = new FormGroup({
      search: new FormControl()
    });

    this.searchForm.valueChanges.subscribe((changes) => {
      this.dataView =  this.searchAutorService.sortByAutorName(changes.search);
    });

  }

  editAutor(item) {
    this.dataPoems.map((el, i) => {
      if (el.name === item) {
        this.pointer = i;
      }
    });
    this.autor = new FormGroup({
      autorName: new FormControl(this.dataPoems[this.pointer].name)
    });
    this.isEdit = true;
  }

  successEditAutor() {
    if (this.autor.value.autorName === this.dataPoems[this.pointer].name) {
      this.isEdit = false;
    } else {
      this.dataPoems[this.pointer].name = this.autor.value.autorName;
      this.apiDataService.updatePoems(this.dataPoems);
      this.isEdit = false;
      this.dataView = this.searchAutorService.sortByAutorName('');
      this.searchForm.setValue({search: ''});
    }
  }

  cancel() {
    this.isEdit = false;
  }

}
