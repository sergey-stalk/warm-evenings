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

  headerLinks = [
    {name: 'Главная', link: ''},
    {name: 'Встречи', link: '/schedule'},
  ];

  adminHeaderLinks = [
    {name: 'Редактор', link: '/admin'},
    {name: 'Настройки', link: '/admin/settings'},
    {name: 'Сообщения', link: '/admin/message'}
  ];

  ngOnInit() {
    if (localStorage.auth === 'true') {
      this.isAdmin = true;
    }
    /* this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/admin') {
          this.isAdmin = true;
        }
      }
    }); */
  }
  exit() {
    localStorage.clear();
    this.router.navigate(['/auth']);
    this.isAdmin = false;
  }
}
