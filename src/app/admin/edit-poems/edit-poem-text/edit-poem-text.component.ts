import { SearchPoemService } from './../../../services/search-poem.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CatchDataService } from './../../../services/catch-data.service';
import { ApiDataService } from 'src/app/services/api-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-poem-text',
  templateUrl: './edit-poem-text.component.html',
  styleUrls: ['./edit-poem-text.component.css']
})
export class EditPoemTextComponent implements OnInit {

  constructor(
    private apiDataService: ApiDataService,
    private catchDataService: CatchDataService,
    private searchPoemService: SearchPoemService
  ) { }

  dataPoems;
  pointer;
  index;
  selectAutor: FormGroup;
  textArea: FormGroup;
  searchPoem: FormGroup;
  isSelected = false;
  isEdit = false;
  newAutorName;
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
        }
      });
      this.isSelected = true;
      if (this.dataPoems[this.pointer].poems.length === 0) {
        this.newAutorName = true;
      } else {
        this.newAutorName = false;
      }
    });

    this.searchPoem = new FormGroup({
      poem: new FormControl()
    });

    this.searchPoem.valueChanges.subscribe((changes) => {
      this.dataView = this.searchPoemService.searchByPoemName(changes.poem, this.pointer);
    });

  }

  edit(item) {
    this.dataPoems[this.pointer].poems.map((el, i) => {
      if (el.poemName === item) {
        this.index = i;
      }
    });
    this.textArea = new FormGroup({
      text: new FormControl(this.dataPoems[this.pointer].poems[this.index].poem)
    });
    this.isEdit = true;
  }

  successEdit() {
    if (this.textArea.value.text === this.dataPoems[this.pointer].poems[this.index].poem) {
      this.cancel();
    } else {
      this.dataPoems[this.pointer].poems[this.index].poem = this.textArea.value.text;
      this.apiDataService.updatePoems(this.dataPoems);
      this.dataView = this.searchPoemService.searchByPoemName('', this.index);
      this.searchPoem.setValue({poem: ''});
    }
    this.cancel();
  }

  cancel() {
    this.isEdit = false;
  }

}
