import { CatchDataService } from './../../services/catch-data.service';
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

  constructor(
    private apiDataService: ApiDataService,
    private telegramAlertService: TelegramAlertService,
    private catchDataService: CatchDataService,
    ) { }

  meetingData;
  settings;
  dataWriten = true;
  form: FormGroup;

  ngOnInit() {

    if (localStorage.meeting) {
      this.meetingData = this.catchDataService.getCatchItem('meeting');
      this.meetingData.reverse();
    } else {
      this.apiDataService.getMeetingData().subscribe((meeting) => {
        this.catchDataService.updateCatch('meeting', meeting);
        this.meetingData = meeting;
        this.meetingData.reverse();
      });
    }

    if (localStorage.settings) {
      this.settings = this.catchDataService.getCatchItem('settings');
    } else {
      this.apiDataService.getSettings().subscribe((settings) => {
        this.catchDataService.catch('settings', settings);
      });
    }

    this.form = new FormGroup({
      autor: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      text: new FormControl('' , Validators.required)
    });
  }

  delete(index) {
    const newData = this.meetingData.filter((el, i) => {
      if (index !== i) {
        return el;
      }
    });

    newData.reverse();
    this.apiDataService.updateData(newData);
    this.catchDataService.updateCatch('meeting', newData);
    newData.reverse();
    this.meetingData = newData;
  }

  writeNewData() {
    this.dataWriten = !this.dataWriten;
  }

  addNewData() {
    console.log(this.form.value);
    this.meetingData.reverse().push(this.form.value);
    this.apiDataService.updateData(this.meetingData);
    this.catchDataService.updateCatch('meeting', this.meetingData);

    this.writeNewData();

    const message = `${this.form.value.text}%0A${this.form.value.date} | ${this.form.value.autor}`;
    if (this.settings.telegram) {
      this.telegramAlertService.sandMessage(message);
    }

    this.meetingData.reverse();
    this.form.reset();
  }
}
