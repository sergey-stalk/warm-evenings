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
      autorName: new FormControl('')
    });
  }

  removeAutorName() {
    this.dataPoems = this.dataPoems.filter((el) => {
      if (el.name !== this.selectAutor.value.autorName) {
        return el;
      }
    });
    this.catchDataService.updateCatch('poems', this.dataPoems);
    this.apiDataService.updatePoems(this.dataPoems);
    this.selectAutor.reset();
  }

}
