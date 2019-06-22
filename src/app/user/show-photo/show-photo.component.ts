import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { CatchDataService } from 'src/app/services/catch-data.service';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-show-photo',
  templateUrl: './show-photo.component.html',
  styleUrls: ['./show-photo.component.css']
})
export class ShowPhotoComponent implements OnInit {

  dataPhoto;

  constructor(
    private catchDataService: CatchDataService,
    private apiDataService: ApiDataService
  ) { }

  ngOnInit() {
    if (!localStorage.photo) {
      this.apiDataService.getPhoto().subscribe((dataPhoto) => {
        this.dataPhoto = dataPhoto;
        this.catchDataService.updateCatch('photo', this.dataPhoto);
      });
    } else {
      this.dataPhoto = this.catchDataService.getCatchItem('photo');
    }
  }

}
