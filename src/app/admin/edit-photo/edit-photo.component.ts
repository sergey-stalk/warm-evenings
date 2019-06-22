import { ApiDataService } from '../../services/api-data.service';
import { CatchDataService } from '../../services/catch-data.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit {

  uploadFileForm: FormGroup;
  uploadUrlForm: FormGroup;
  files: File;
  progress;
  dataPhoto;
  isAddPhoto = false;
  responseBody;
  imageUrl;
  notValid = false;
  alreadyExists = false;
  errorAlert;
  successAlert;
  isHidden = true;
  testImg = '../../../assets/logo-dark.png';
  validForm = false;


  constructor(
    private http: HttpClient,
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

    this.uploadFileForm = new FormGroup({
      file: new FormControl('', Validators.required)
    });

    this.uploadUrlForm = new FormGroup({
      photoUrl: new FormControl('', Validators.required)
    });

    this.uploadUrlForm.valueChanges.pipe(debounceTime(500))
      .subscribe((changes) => {
        if (changes.photoUrl.length !== '') {
          this.testImg = changes.photoUrl;
        } else {
          this.testImg = '';
          this.validForm = false;
        }
      });
  }

  addFile(event) {
    this.files = event.target.files[0] as File;
  }

  adding() {
    this.isAddPhoto = true;
  }

  cancel() {
    this.isAddPhoto = false;
    this.uploadFileForm.reset();
    this.uploadUrlForm.reset();
  }

  error() {
    this.isHidden = false;
    this.successAlert = '';
    this.validForm = false;
    this.testImg = '';
    this.errorAlert = 'Неверный адресс';
  }

  success() {
    if (this.uploadUrlForm.valid) {
      this.isHidden = false;
      this.errorAlert = '';
      this.validForm = true;
      this.successAlert = 'Адресс существует';
    }
  }

  addUrl() {
    this.dataPhoto.push({url: this.testImg});
    this.apiDataService.updatePhoto(this.dataPhoto);
    this.catchDataService.updateCatch('photo', this.dataPhoto);
  }

  delete(url) {
    this.dataPhoto = this.dataPhoto.filter((el) => {
      if (el.url !== url) {
        return el;
      }
    });
    this.apiDataService.updatePhoto(this.dataPhoto);
    this.catchDataService.updateCatch('photo', this.dataPhoto);
  }

  send() {
    const fd = new FormData();
    fd.append('image', this.files, this.files.name);
    const token = '187763305bb2bd6d5eda199469589bca';
    const url = `api/1/upload?key=${token}`;
    this.http.post(url, fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(event.loaded / event.total * 100) + '%';
      } else if (event.type === HttpEventType.Response) {
        setTimeout(() => {
          this.progress = 0;
          this.uploadFileForm.reset();
        }, 1000);
        this.responseBody = event.body;
        this.imageUrl = this.responseBody.data.display_url;
        this.dataPhoto.map((el) => {
          if (el.url === this.imageUrl) {
            this.alreadyExists = true;
            this.errorAlert = 'Уже существует';
            this.isHidden = false;
          }
        });
        if (!this.alreadyExists) {
          this.dataPhoto.push({ url: this.imageUrl });
          this.apiDataService.updatePhoto(this.dataPhoto);
          this.catchDataService.updateCatch('photo', this.dataPhoto);
          this.successAlert = 'Добавлено в галерею';
          this.isHidden = false;
          setTimeout(() => {
            this.successAlert = '';
            this.isHidden = true;
          }, 3000);
          this.errorAlert = '';
        }
        this.alreadyExists = false;
      }
    }, () => {
      this.errorAlert = 'Ошибка при загрузке файла';
      this.isHidden = false;
      this.uploadFileForm.reset();
    });
  }
}
