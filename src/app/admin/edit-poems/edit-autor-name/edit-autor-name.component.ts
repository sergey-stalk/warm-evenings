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

  constructor(private apiDataService: ApiDataService, private catchDataService: CatchDataService) { }

  autor: FormGroup;
  dataPoems;
  pointer;
  isEdit = false;

  ngOnInit() {
    if (localStorage.poems) {
      this.dataPoems = this.catchDataService.getCatchItem('poems');
    } else {
      this.apiDataService.getPoems().subscribe((poems) => {
        this.dataPoems = poems;
        this.catchDataService.updateCatch('poems', poems);
      });
    }
  }

  editAutor(i) {
    this.autor = new FormGroup({
      autorName: new FormControl(this.dataPoems[i].name)
    });

    this.isEdit = true;
    this.pointer = i;
  }

  successEditAutor() {

    if (this.autor.value.autorName === this.dataPoems[this.pointer].name) {
      this.isEdit = false;
    } else {
      this.dataPoems[this.pointer].name = this.autor.value.autorName;
      this.apiDataService.updatePoems(this.dataPoems);
      this.catchDataService.updateCatch('poems', this.dataPoems);
      this.isEdit = false;
    }
  }

  cancel() {
    this.isEdit = false;
  }

}
