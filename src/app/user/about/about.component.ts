import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  isCopy = false;

  ngOnInit() {
  }

  copy() {
    // tslint:disable-next-line:max-line-length
    window.open('https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRmVpZTnsfpGTZzZfgVFHGdTkqRSMxXSWvkPrRtmsLHVmShxNhCDDJlkwVZHfZLLfxnXTZL');
  }

}
