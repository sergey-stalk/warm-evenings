import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {

  constructor(private router: Router) { }
  isAdmin = false;
  headerLinks = [{name: 'Встречи', link: ''}, {name: 'Редактор', link: '/admin'}];

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/admin') {
          this.isAdmin = true;
        }
      }
    });
  }
  exit() {
    localStorage.clear();
    this.router.navigate(['/auth']);
    this.isAdmin = false;
  }
}
