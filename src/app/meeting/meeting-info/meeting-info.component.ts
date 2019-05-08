import { ApiDataService } from '../api-data.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-meeting-info',
  templateUrl: './meeting-info.component.html',
  styleUrls: ['./meeting-info.component.css']
})
export class MeetingInfoComponent implements OnInit {

  constructor(private apiDataService: ApiDataService) { }
  data: any = [];

  ngOnInit() {
    this.apiDataService.getApiData().subscribe((res) => {
      this.data = res;
    });
  }


}
