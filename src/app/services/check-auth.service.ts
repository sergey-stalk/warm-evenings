import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CheckAuthService {

constructor(private router: Router) { }

  checkStorage() {
    if (localStorage.auth === 'true') {
      return true;
    }
    return false;
  }

  checkForm(form) {
    if (form.login === 'admin' && form.password === 'kobzar') {
      localStorage.setItem('auth', 'true');
      this.router.navigate(['/admin']);
      return false;
    }
    return true;
  }
}
