import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  isCopy = false;

  ngOnInit() {
  }

  copyForMobile() {
    this.isCopy = true;
    setTimeout(() => {
      this.isCopy = false;
      window.open('https://mail.google.com/mail/mu/mp/770/#co');
    }, 2000);
  }

  copy() {
    this.isCopy = true;
    setTimeout(() => {
      this.isCopy = false;
      window.open('https://mail.google.com/mail/u/0/#inbox?compose=new');
    }, 2000);
  }

}
