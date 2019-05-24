import { ApiDataService } from './../services/api-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CatchDataService } from '../services/catch-data.service';


@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private catchDataService: CatchDataService,
    private apiDataService: ApiDataService
  ) { }

  isAdmin = false;
  isPoems = false;
  version;

  headerLinks = [
    {name: 'Главная', link: ''},
    {name: 'Встречи', link: '/schedule'},
    {name: 'Стихи', link: '/show_poems'}
  ];

  adminHeaderLinks = [
    {name: 'Встречи', link: '/admin'},
    {name: 'Настройки', link: '/admin/settings'},
    {name: 'Сообщения', link: '/admin/message'},
    {name: 'Стихи', link: 'admin/edit_poems/edit_autor_name'}
  ];

  ngOnInit() {
    this.catchDataService.clear();
    if (!localStorage.meeting) {
      this.apiDataService.getMeetingData().subscribe((meetingData) => {
        this.catchDataService.catch('meeting', meetingData);
      });
    }
    if (!localStorage.poems) {
      this.apiDataService.getPoems().subscribe((poemsData) => {
        this.catchDataService.catch('poems', poemsData);
      });
    }

    if (localStorage.auth === 'true') {
      this.isAdmin = true;
    }
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/admin') {
          this.isAdmin = true;
        }
        if (e.url.includes('edit_poems')) {
          this.isPoems = true;
        } else {
          this.isPoems = false;
        }
      }
    });
  }

  exit() {
    this.catchDataService.updateCatch('auth', false);
    this.router.navigate(['/auth']);
    this.isAdmin = false;
  }
}
