import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';
import { CatchDataService } from 'src/app/services/catch-data.service';

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.css']
})
export class ShowVideoComponent implements OnInit {

  constructor(
    private catchDataService: CatchDataService,
    private apiDataService: ApiDataService
  ) { }

  dataVideo;

  ngOnInit() {
    if (localStorage.video) {
      this.dataVideo = this.catchDataService.getCatchItem('video');
      this.dataVideo.reverse();
    } else {
      this.apiDataService.getVideo().subscribe((dataVideo) => {
        this.dataVideo = dataVideo;
        this.catchDataService.updateCatch('video', dataVideo);
        this.dataVideo.reverse();
      });
    }
  }

}
