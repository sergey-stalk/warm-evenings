import { ApiDataService } from '../api-data.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-meeting-reduct',
  templateUrl: './meeting-reduct.component.html',
  styleUrls: ['./meeting-reduct.component.css']
})
export class MeetingReductComponent implements OnInit {

  constructor(private apiDataService: ApiDataService) { }
  data: any = [];
  dataWriten = true;

  form: FormGroup;

  ngOnInit() {
    this.apiDataService.getApiData().subscribe((res) => {
      this.data = res;
      this.data = this.data.reverse();
    });

    this.form = new FormGroup({
      autor: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      text: new FormControl('' , Validators.required)
    });
  }

  delete(index) {
    const nData = this.data.filter((el, i) => {
      if (index !== i) {
        return el;
      }
    });

    this.data = nData;
    this.apiDataService.updateData(nData);
  }

  writeNewData() {
    this.dataWriten = !this.dataWriten;
  }

  addData() {
    const nData = this.data.concat(this.form.value);
    this.data.unshift(this.form.value);
    this.apiDataService.updateData(nData);
    this.writeNewData();
  }
}
