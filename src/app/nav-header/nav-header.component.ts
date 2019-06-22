import { ApiDataService } from './../services/api-data.service';
import { Component, OnInit } from '@angular/core';
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

  headerLinks = [
    {name: 'Главная', link: ''},
    {name: 'Встречи', link: '/schedule'},
    {name: 'Стихи', link: '/show_poems'},
    {name: 'Фото', link: '/show_photo'},
    {name: 'Видео', link: '/show_video'}
  ];

  adminHeaderLinks = [
    {name: 'Встречи', link: '/admin'},
    {name: 'Настройки', link: '/admin/settings'},
    {name: 'Сообщения', link: '/admin/message'},
    {name: 'Стихи', link: 'admin/edit_poems/edit_autor_name'},
    {name: 'Фото', link: 'admin/edit_photo'},
    {name: 'Видео', link: 'admin/edit_video'},
  ];

  adminMobileHeaderLinks = [
    {name: '<i class="fas fa-users"></i>', link: '/admin'},
    {name: '<i class="fas fa-cog"></i>', link: '/admin/settings'},
    {name: '<i class="fas fa-comment-dots"></i>', link: '/admin/message'},
    {name: '<i class="fas fa-book"></i>', link: 'admin/edit_poems/edit_autor_name'},
    {name: '<i class="fas fa-image"></i>', link: '/admin/edit_photo'},
    {name: '<i class="fas fa-video"></i>', link: '/admin/edit_video'}

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
    if (!localStorage.settings) {
      this.apiDataService.getSettings().subscribe((settings) => {
        this.catchDataService.catch('settings', settings);
      });
    }
    if (!localStorage.photo) {
      this.apiDataService.getPhoto().subscribe((photo) => {
        this.catchDataService.catch('photo', photo);
      });
    }
    if (!localStorage.video) {
      this.apiDataService.getVideo().subscribe((video) => {
        this.catchDataService.catch('video', video);
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
