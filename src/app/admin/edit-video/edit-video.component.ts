import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CatchDataService } from 'src/app/services/catch-data.service';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {

  dataVideo;
  uploadVideo: FormGroup;
  height;
  prefix = 'http://img.youtube.com/vi/';
  postfix = '/0.jpg';
  alreadyExists = false;
  isHidden = true;
  validForm = false;
  token;
  url = '';

  constructor(
    private catchDataService: CatchDataService,
    private apiDataService: ApiDataService
  ) { }

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
    this.uploadVideo = new FormGroup({
      videoUrl: new FormControl('', Validators.required)
    });

  }

  delete(url) {
    this.dataVideo = this.dataVideo.filter((el) => {
      if (el.url !== url) {
        return el;
      }
    });
    this.apiDataService.updateVideo(this.dataVideo);
    this.catchDataService.updateCatch('video', this.dataVideo);
    return false;
  }

  sendUrl() {
    const fullscreen = 'https://www.youtube.com/watch?v=';
    const mobile = 'https://youtu.be/';
    if (this.uploadVideo.value.videoUrl.includes(fullscreen)) {
      this.token = this.uploadVideo.value.videoUrl.split(fullscreen);
      this.url = fullscreen + this.token[1];
    } else  if (this.uploadVideo.value.videoUrl.includes(mobile)) {
      this.token = this.uploadVideo.value.videoUrl.split(mobile);
      this.url = fullscreen + this.token[1];
    }
    this.dataVideo.map((el) => {
      if (el.url === this.url) {
        this.alreadyExists = true;
      }
    });
    if (!this.alreadyExists) {
        this.dataVideo.reverse();
        const url = this.url;
        const imgUrl = this.prefix + this.token[1] + this.postfix;
        this.dataVideo.push({ url, imgUrl });
        this.apiDataService.updateVideo(this.dataVideo);
        this.catchDataService.updateCatch('video', this.dataVideo);
        this.dataVideo.reverse();
    }
    setTimeout(() => {
      this.alreadyExists = false;
    }, 2000);
    this.uploadVideo.reset();
  }

}
