import { SearchPoemService } from './../../../services/search-poem.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CatchDataService } from './../../../services/catch-data.service';
import { ApiDataService } from 'src/app/services/api-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-poem-name',
  templateUrl: './edit-poem-name.component.html',
  styleUrls: ['./edit-poem-name.component.css']
})
export class EditPoemNameComponent implements OnInit {

  constructor(
    private apiDataService: ApiDataService,
    private catchDataService: CatchDataService,
    private searchPoemService: SearchPoemService
  ) { }

  dataPoems;
  pointer;
  index;
  selectAutor: FormGroup;
  form: FormGroup;
  isEdit = false;
  isSelected = false;
  newAutorName = false;
  searchPoem: FormGroup;
  dataView;

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
    this.selectAutor = new FormGroup({
      autor: new FormControl()
    });

    this.selectAutor.valueChanges.subscribe((changes) => {
      this.dataPoems.map((element, index) => {
        if (element.name === changes.autor) {
          this.pointer = index;
          this.isSelected = true;
          if (this.dataPoems[this.pointer].poems.length === 0) {
            this.newAutorName = true;
          } else {
            this.newAutorName = false;
          }
        }
      });
    });

    this.searchPoem = new FormGroup({
      poem: new FormControl()
    });

    this.searchPoem.valueChanges.subscribe((changes) => {
      this.dataView = this.searchPoemService.searchByPoemName(changes.poem, this.pointer);
    });
  }

  edit(item) {
    this.isEdit = true;
    this.dataPoems[this.pointer].poems.map((el, i) => {
      if (el.poemName === item) {
        this.index = i;
      }
    });
    this.form = new FormGroup({
      poemName: new FormControl(this.dataPoems[this.pointer].poems[this.index].poemName)
    });

  }

  successEdit() {
    if (this.form.value.poemName === this.dataPoems[this.pointer].poems[this.index].poemName) {
      this.cancel();
    } else {
      this.dataPoems[this.pointer].poems[this.index].poemName = this.form.value.poemName;
      this.apiDataService.updatePoems(this.dataPoems);
      this.dataView = this.searchPoemService.searchByPoemName('', this.index);
      this.searchPoem.setValue({ poem: '' });

    }
    this.cancel();
  }

  cancel() {
    this.isEdit = false;
  }
}
