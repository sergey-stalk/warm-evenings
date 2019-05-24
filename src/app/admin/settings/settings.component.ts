import { CatchDataService } from './../../services/catch-data.service';
import { ApiDataService } from './../../services/api-data.service';

import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private apiDataService: ApiDataService, private catchDataService: CatchDataService) { }

  switcher: FormGroup;
  settings;

  ngOnInit() {
    this.switcher = new FormGroup({
      telegramSettings: new FormControl()
    });

    if (localStorage.settings) {
      this.settings = this.catchDataService.getCatchItem('settings');
      this.switcher.setValue(this.settings);
    } else {
      this.apiDataService.getSettings().subscribe((settings) => {
        this.settings = settings;
        this.catchDataService.updateCatch('settings', this.settings);
        this.switcher.setValue(this.settings);
      });
    }

    this.switcher.valueChanges.subscribe((changes) => {
      this.catchDataService.updateCatch('settings', changes);
      this.apiDataService.setSettings(changes);
      this.settings = changes;
    });

  }
}
