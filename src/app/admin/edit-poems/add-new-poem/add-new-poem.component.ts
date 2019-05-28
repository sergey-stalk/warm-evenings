import { SearchAutorService } from './../../../services/search-autor.service';
import { SearchPoemService } from './../../../services/search-poem.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatchDataService } from './../../../services/catch-data.service';
import { ApiDataService } from './../../../services/api-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-poem',
  templateUrl: './add-new-poem.component.html',
  styleUrls: ['./add-new-poem.component.css']
})
export class AddNewPoemComponent implements OnInit {

  constructor(
    private apiDataService: ApiDataService,
    private catchDataService: CatchDataService,
    private searchAutorService: SearchAutorService
  ) { }

  dataPoems;
  addAutorForm: FormGroup;
  addPoemForm: FormGroup;
  searchAutor: FormGroup;
  comparisonName = false;
  isAddAutor = false;
  isAddPoems = false;
  pointer;
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

    this.addAutorForm = new FormGroup({
      autorName: new FormControl('', Validators.required)
    });

    this.addPoemForm = new FormGroup({
      poemName: new FormControl('', Validators.required),
      poemText: new FormControl('', Validators.required)
    });

    this.searchAutor = new FormGroup({
      autor: new FormControl()
    });
    this.searchAutor.valueChanges.subscribe((changes) => {
      this.dataView = this.searchAutorService.sortByAutorName(changes.autor);
    });
  }


  comparison() {
    return this.dataPoems.some((el) => {
      return el.name === this.addAutorForm.value.autorName;
    });
  }

  addAutorName() {
    this.comparisonName = this.comparison();
    if (!this.comparisonName) {
      this.dataPoems.push({ name: this.addAutorForm.value.autorName, poems: [] });
      this.apiDataService.updatePoems(this.dataPoems);
    }
    this.addAutorForm.reset();
    this.addingAutor();
    this.dataView = this.searchAutorService.sortByAutorName('');
    this.searchAutor.setValue({autor: ''});
  }

  addPoem() {
    this.dataPoems[this.pointer].poems.push({ poemName: this.addPoemForm.value.poemName, poem: this.addPoemForm.value.poemText });
    this.apiDataService.updatePoems(this.dataPoems);
    this.addPoemForm.reset();
    this.isAddPoems = !this.isAddPoems;
  }

  addingPoem(item) {
    this.isAddPoems = !this.isAddPoems;
    this.dataPoems.map((el, i) => {
      if (el.name === item) {
        this.pointer = i;
      }
    });
  }

  addingAutor() {
    this.isAddAutor = !this.isAddAutor;
  }


  cancel() {
    this.isAddAutor = false;
    this.isAddPoems = false;
    this.addPoemForm.reset();
    this.addAutorForm.reset();
  }

}
