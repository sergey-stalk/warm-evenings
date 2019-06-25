import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatchDataService } from './../../../services/catch-data.service';
import { ApiDataService } from './../../../services/api-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remove-poem',
  templateUrl: './remove-poem.component.html',
  styleUrls: ['./remove-poem.component.css']
})
export class RemovePoemComponent implements OnInit {

  constructor(private apiDataService: ApiDataService, private catchDataService: CatchDataService) { }

  dataPoems;
  selectAutor: FormGroup;
  selectPoem: FormGroup;
  isSelectedAutor = false;
  pointer;

  ngOnInit() {
    if (localStorage.poems) {
      this.dataPoems = this.catchDataService.getCatchItem('poems');
    } else {
      this.apiDataService.getPoems().subscribe((poems) => {
        this.dataPoems = poems;
        this.catchDataService.updateCatch('poems', poems);
      });
    }

    this.selectPoem = new FormGroup({
      autor: new FormControl('', Validators.required),
      poemName: new FormControl('', Validators.required)
    });


    this.selectPoem.valueChanges.subscribe((changes) => {
      this.dataPoems.map((el, i) => {
        if (el.name === changes.autor) {
          this.pointer = i;
          this.isSelectedAutor = true;
        }
      });
    });

    this.selectAutor = new FormGroup({
      autorName: new FormControl('', Validators.required)
    });
  }

  removeAutorName() {
    this.dataPoems = this.dataPoems.filter((el) => {
      if (el.name !== this.selectAutor.value.autorName) {
        return el;
      }
    });
    this.apiDataService.updatePoems(this.dataPoems);
    this.catchDataService.updateCatch('poems', this.dataPoems);
    this.selectAutor.reset();
  }

  removePoem() {
    this.dataPoems[this.pointer].poems = this.dataPoems[this.pointer].poems.filter((el) => {
      if (this.selectPoem.value.poemName !== el.poemName) {
        return el;
      }
    });
    this.apiDataService.updatePoems(this.dataPoems);
    this.catchDataService.updateCatch('poems', this.dataPoems);
    this.selectPoem.reset();
    this.isSelectedAutor = false;
  }
}
