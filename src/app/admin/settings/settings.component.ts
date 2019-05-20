import { ApiDataService } from './../../services/api-data.service';

import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private apiDataService: ApiDataService) { }

  switcher: FormGroup;
  settings: any;
  state = '';
  btnState = '';

  ngOnInit() {
    if (localStorage.settings) {
      this.settings = JSON.parse(localStorage.settings);
      if (this.settings.telegram) {
          this.state = 'Включен';
          this.btnState = 'Отключить';
        } else {
          this.state = 'Отключен';
          this.btnState = 'Включить';
        }
    } else {
      this.apiDataService.getSettings().subscribe((settings) => {
        this.settings = settings;
        localStorage.setItem('settings', JSON.stringify(settings));
        if (this.settings.telegram) {
          this.state = 'Включен';
          this.btnState = 'Отключить';
        } else {
          this.state = 'Отключен';
          this.btnState = 'Включить';
        }
      });
    }
  }

  chengeState() {
    this.settings.telegram = !this.settings.telegram;
    if (this.settings.telegram) {
      this.state = 'Включен';
      this.btnState = 'Отключить';
    } else {
      this.state = 'Отключен';
      this.btnState = 'Включить';
    }
    localStorage.settings = JSON.stringify(this.settings);
    this.apiDataService.setSettings(this.settings);
  }
}
