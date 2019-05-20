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

  isEditingAutor = false;
  isEditingPoem = false;
  isEditingPoemName = false;

  pointer;

  ngOnInit() {
    if (localStorage.poems) {
      this.dataPoems = JSON.parse(localStorage.poems);
    } else {
      this.apiDataService.getPoems().subscribe((poems) => {
        this.dataPoems = poems;
        localStorage.setItem('poems', JSON.stringify(poems));
        console.log(this.dataPoems);
      });
    }
  }

  editAutor(i) {
    this.autor = new FormGroup({
      autorFild: new FormControl(this.dataPoems[i].name)
    });
    this.isEditingAutor = true;
    this.pointer = i;
  }

  successEditAutor() {
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
  }
}
