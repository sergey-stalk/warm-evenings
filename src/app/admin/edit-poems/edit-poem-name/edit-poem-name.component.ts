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

  constructor(private apiDataService: ApiDataService, private catchDataService: CatchDataService) { }

  dataPoems;
  pointer;
  index;
  selectAutor: FormGroup;
  form: FormGroup;
  isEdit = false;
  isSelected = false;
  newAutorName = false;

  ngOnInit() {
    if (localStorage.poems) {
      this.dataPoems = this.catchDataService.getCatchItem('poems');
    } else {
      this.apiDataService.getPoems().subscribe((poems) => {
        this.dataPoems = poems;
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
  }

  edit(index) {
    this.isEdit = true;
    this.index = index;
    this.form = new FormGroup({
      poemName: new FormControl(this.dataPoems[this.pointer].poems[index].poemName)
    });
  }

  successEdit() {
    if (this.form.value.poemName === this.dataPoems[this.pointer].poems[this.index].poemName) {
      this.cancel();
    } else {
      this.dataPoems[this.pointer].poems[this.index].poemName = this.form.value.poemName;
      this.catchDataService.updateCatch('poems', this.dataPoems);
      this.apiDataService.updatePoems(this.dataPoems);
    }
    this.cancel();
  }

  cancel() {
    this.isEdit = false;
  }
}
