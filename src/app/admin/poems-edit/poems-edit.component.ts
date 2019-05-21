import { FormGroup, FormControl } from '@angular/forms';
import { ApiDataService } from 'src/app/services/api-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poems-edit',
  templateUrl: './poems-edit.component.html',
  styleUrls: ['./poems-edit.component.css']
})
export class PoemsEditComponent implements OnInit {

  constructor(private apiDataService: ApiDataService) { }

  dataPoems;
  autor: FormGroup;
  poemName: FormGroup;
  poem: FormGroup;
  poemNameAutor: FormGroup;
  poemText: FormGroup;

  isEditingAutor = false;
  isEditingPoem = false;
  isEditingPoemName = false;

  selectPoemNameAutor;
  selectAutorData;
  textAr = '';

  pointer;

  ngOnInit() {
    if (localStorage.poems) {
      this.dataPoems = JSON.parse(localStorage.poems);
    } else {
      this.apiDataService.getPoems().subscribe((poems) => {
        this.dataPoems = poems;
        localStorage.setItem('poems', JSON.stringify(poems));
      });
    }

    this.poemNameAutor = new FormGroup({
      poemAutor: new FormControl('')
    });

    this.poemNameAutor.valueChanges.subscribe((changes) => {
      this.selectPoemNameAutor = changes.poemAutor;
      this.selectAutorData = this.dataPoems.filter((el) => {
        return el.name === this.selectPoemNameAutor;
      });
      console.log(this.selectAutorData);
    });
    this.poemText = new FormGroup({
      textArea: new FormControl('')
    });
  }

  editAutor(i) {
    this.autor = new FormGroup({
      autorFild: new FormControl(this.dataPoems[i].name)
    });
    this.isEditingAutor = true;
    this.pointer = i;
  }

  editPoemName(i) {
    this.poemName = new FormGroup({
      poemNameFild: new FormControl(this.selectAutorData[0].poems[i].poemName)
    });
    this.isEditingPoemName = true;
    this.pointer = i;
  }

  successEditAutor() {
    if (this.poemName.value.poemNameFild === this.selectAutorData[0].poems[this.pointer].poemName) {
      this.isEditingPoemName = false;
    } else {
      this.selectAutorData[0].poems[this.pointer].poemName = this.poemName.value.poemNameFild;
      this.apiDataService.updatePoems(this.dataPoems);
      localStorage.poems = JSON.stringify(this.dataPoems);
      this.isEditingPoemName = false;
    }
  }

  successEditPoemName() {
    if (this.autor.value.autorFild === this.dataPoems[this.pointer].name) {
      this.isEditingAutor = false;
    } else {
      this.dataPoems[this.pointer].name = this.autor.value.autorFild;
      this.apiDataService.updatePoems(this.dataPoems);
      this.isEditingAutor = false;
    }
  }

  cancel() {
    this.isEditingAutor = false;
    this.isEditingPoemName = false;
    this.isEditingPoem = false;
  }

  testTextArea() {
    console.log(this.poemText.value.textArea);
  }
}
