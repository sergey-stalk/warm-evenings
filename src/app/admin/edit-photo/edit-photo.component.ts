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
  isMobile = false;


  constructor(
    private http: HttpClient,
    private catchDataService: CatchDataService,
    private apiDataService: ApiDataService
  ) { }

  ngOnInit() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobile = true;
    }
    if (!localStorage.photo) {
      this.apiDataService.getPhoto().subscribe((dataPhoto) => {
        this.dataPhoto = dataPhoto;
        this.catchDataService.updateCatch('photo', this.dataPhoto);
        this.dataPhoto.reverse();
      });
    } else {
      this.dataPhoto = this.catchDataService.getCatchItem('photo');
      this.dataPhoto.reverse();
    }

    this.uploadFileForm = new FormGroup({
      file: new FormControl('', Validators.required)
    });

    this.uploadUrlForm = new FormGroup({
      photoUrl: new FormControl('', Validators.required)
    });

    this.uploadUrlForm.valueChanges.pipe(debounceTime(500))
      .subscribe((changes) => {
        if (changes.photoUrl !== '' || changes.photoUrl) {
          this.dataPhoto.map((el) => {
            if (el.url === changes.photoUrl) {
              this.alreadyExists = true;
            }
          });
          if (!this.alreadyExists) {
            this.testImg = changes.photoUrl;
          } else if (!this.successAlert) {
            this.errorAlert = 'Уже добавлена';
            this.isHidden = false;
          } else {
            this.errorAlert = '';
            this.alreadyExists = false;
          }
        } else {
          this.errorAlert = '';
          this.successAlert = '';
          this.isHidden = true;
          this.testImg = '';
          this.validForm = false;
          this.alreadyExists = false;

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
    if (this.uploadUrlForm.valid && !this.alreadyExists) {
      this.isHidden = false;
      this.errorAlert = '';
      this.validForm = true;
      this.successAlert = 'Адресс существует';
    }
  }

  addUrl() {
    this.dataPhoto.reverse();
    this.successAlert = 'Добавлено';
    this.dataPhoto.push({ url: this.testImg });
    this.apiDataService.updatePhoto(this.dataPhoto);
    this.catchDataService.updateCatch('photo', this.dataPhoto);
    setTimeout(() => {
      this.successAlert = '';
      this.isHidden = true;
    }, 2000);
    this.uploadUrlForm.reset();
    this.dataPhoto.reverse();
  }

  delete(url) {
    this.dataPhoto.reverse();
    this.dataPhoto = this.dataPhoto.filter((el) => {
      if (el.url !== url) {
        return el;
      }
    });
    this.apiDataService.updatePhoto(this.dataPhoto);
    this.catchDataService.updateCatch('photo', this.dataPhoto);
    this.dataPhoto.reverse();
    return false;
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
            this.errorAlert = 'Уже добавлена';
            this.isHidden = false;
          }
        });
        if (!this.alreadyExists) {
          this.dataPhoto.reverse();
          this.dataPhoto.push({ url: this.imageUrl });
          this.apiDataService.updatePhoto(this.dataPhoto);
          this.catchDataService.updateCatch('photo', this.dataPhoto);
          this.successAlert = 'Добавлено в галерею';
          this.isHidden = false;
          this.dataPhoto.reverse();
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
