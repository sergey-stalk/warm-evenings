import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TelegramAlertService {

constructor(private http: HttpClient) { }
  sandMassage(text) {
    const url = 'https://api.telegram.org/';
    const token = 'bot891316829:AAE942FNT6v2NKUi4l6yxtsDn-B8oSe_OCI/';
    const sand = 'sendMessage?chat_id=350455788&text=';
    this.http.get(`${url}${token}${sand}${text}`).subscribe(() => {});
  }
}
