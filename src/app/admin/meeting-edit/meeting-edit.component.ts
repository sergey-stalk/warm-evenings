import { TelegramAlertService } from '../../services/telegram-alert.service';
import { ApiDataService } from '../../services/api-data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-meeting-edit',
  templateUrl: './meeting-edit.component.html',
  styleUrls: ['./meeting-edit.component.css']
})
export class MeetingEditComponent implements OnInit {

  constructor(private apiDataService: ApiDataService, private telegramAlertService: TelegramAlertService) { }
  data: any = [];
  dataWriten = true;

  form: FormGroup;
  settings;

  ngOnInit() {
    if (localStorage.meeting) {
      this.data = JSON.parse(localStorage.meeting);
      this.data.reverse();
    } else {
      this.apiDataService.getApiData().subscribe((res) => {
        this.data = res;
        localStorage.setItem('meeting', JSON.stringify(this.data));
        this.data.reverse();
      });
    }

    if (localStorage.settings) {
      this.settings = JSON.parse(localStorage.settings);
    } else {
      this.apiDataService.getSettings().subscribe((settings) => {
        this.settings = settings;
        localStorage.setItem('settings', JSON.stringify(settings));
      });
    }

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
    dData.reverse();
    this.apiDataService.updateData(dData);
    localStorage.meeting = JSON.stringify(dData);
    dData.reverse();
  }

  writeNewData() {
    this.dataWriten = !this.dataWriten;
  }

  addData() {
    const nData = this.data.reverse().concat(this.form.value);
    this.data.reverse().unshift(this.form.value);
    this.apiDataService.updateData(nData);
    localStorage.meeting = JSON.stringify(nData);
    this.writeNewData();
    const message = `${this.form.value.text}%0A${this.form.value.date} | ${this.form.value.autor}`;
    if (this.settings.telegram) {
      this.telegramAlertService.sandMessage(message);
    }
    this.form.reset();
  }
}
