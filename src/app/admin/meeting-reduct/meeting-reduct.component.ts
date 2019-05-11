import { TelegramAlertService } from './../../services/telegram-alert.service';
import { ApiDataService } from './../../services/api-data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-meeting-reduct',
  templateUrl: './meeting-reduct.component.html',
  styleUrls: ['./meeting-reduct.component.css']
})
export class MeetingReductComponent implements OnInit {

  constructor(private apiDataService: ApiDataService, private telegramAlertService: TelegramAlertService) { }
  data: any = [];
  dataWriten = true;

  form: FormGroup;

  ngOnInit() {
    this.apiDataService.getApiData().subscribe((res) => {
      this.data = res;
      this.data.reverse();
    });

    this.form = new FormGroup({
      autor: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      text: new FormControl('' , Validators.required)
    });
  }

  delete(index) {
    const dData = this.data.filter((el, i) => {
      if (index !== i) {
        return el;
      }
    });
    this.data = dData;
    this.apiDataService.updateData(dData);
  }

  writeNewData() {
    this.dataWriten = !this.dataWriten;
  }

  addData() {
    const nData = this.data.reverse().concat(this.form.value);
    this.data.reverse().unshift(this.form.value);
    this.apiDataService.updateData(nData);
    this.writeNewData();
    const message = `${this.form.value.text}%0A${this.form.value.date} | ${this.form.value.autor}`;
    /* this.telegramAlertService.sandMassage(message); */
  }
}
