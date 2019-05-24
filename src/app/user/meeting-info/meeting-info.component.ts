import { ApiDataService } from './../../services/api-data.service';
import { CatchDataService } from './../../services/catch-data.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-meeting-info',
  templateUrl: './meeting-info.component.html',
  styleUrls: ['./meeting-info.component.css']
})
export class MeetingInfoComponent implements OnInit {

  constructor(private catchDataService: CatchDataService, private apiDataService: ApiDataService) { }
  meetingData;

  ngOnInit() {
    if (localStorage.meeting) {
      this.meetingData = this.catchDataService.getCatchItem('meeting');
      this.meetingData.reverse();
    } else {
      this.apiDataService.getMeetingData().subscribe((meeting) => {
        this.catchDataService.updateCatch('meeting', meeting);
        this.meetingData = meeting;
        this.meetingData.reverse();
      });
    }
  }
}
