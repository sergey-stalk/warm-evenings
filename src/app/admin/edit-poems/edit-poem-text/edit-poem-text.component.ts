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

  constructor(private apiDataService: ApiDataService, private catchDataService: CatchDataService) { }

  dataPoems;
  pointer;
  index;
  selectAutor: FormGroup;
  textArea: FormGroup;
  isSelected = false;
  isEdit = false;
  newAutorName;

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
    this.index = index;
    this.textArea = new FormGroup({
      text: new FormControl(this.dataPoems[this.pointer].poems[index].poem)
    });
    this.isEdit = true;
  }

  successEdit() {
    if (this.textArea.value.text === this.dataPoems[this.pointer].poems[this.index].poem) {
      this.cancel();
    } else {
      this.dataPoems[this.pointer].poems[this.index].poem = this.textArea.value.text;
      this.catchDataService.updateCatch('poems', this.dataPoems);
      this.apiDataService.updatePoems(this.dataPoems);
    }
    this.cancel();
  }

  cancel() {
    this.isEdit = false;
  }

}
