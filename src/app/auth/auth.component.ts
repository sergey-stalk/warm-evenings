import { CheckAuthService } from '../check-auth.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private checkAuthService: CheckAuthService) { }

  form: FormGroup;
  invalidStatus = false;
  alertClass = '';

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  checkingAuth() {
    this.invalidStatus = this.checkAuthService.checkForm(this.form.value);
    if (this.invalidStatus) {
      this.alertClass = 'show';
      setTimeout(() => {this.alertClass = ''; }, 3000);
    } else {
      this.alertClass = '';
    }
  }

}
