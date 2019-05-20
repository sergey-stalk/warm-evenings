import { ApiDataService } from './../../services/api-data.service';

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
    if (localStorage.meeting) {
      this.data = JSON.parse(localStorage.meeting);
      this.data.reverse();
    } else {
      this.apiDataService.getApiData().subscribe((res) => {
        this.data = res;
        localStorage.setItem('meeting', JSON.stringify(this.data));
        this.data.reverse();
      });
    }
  }


}
