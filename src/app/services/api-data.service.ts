import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()


export class ApiDataService {

constructor(private http: HttpClient) { }
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type':  'application/json; charset=utf-8',
    })
  };

  urlMeeting = 'https://api.myjson.com/bins/htb96';
  urlSettings = 'https://api.myjson.com/bins/mhszu';
  urlPoems = 'https://api.myjson.com/bins/ot482';
  urlVersion = 'https://api.myjson.com/bins/12ukg8';

  getMeetingData() {
    return this.http.get(this.urlMeeting);
  }
  updateData(data) {
    this.http.put(this.urlMeeting, data, this.httpOptions).subscribe();
  }
  getSettings() {
    return this.http.get(this.urlSettings);
  }

  setSettings(settings) {
    this.http.put(this.urlSettings, settings, this.httpOptions).subscribe();
  }

  getPoems() {
    return this.http.get(this.urlPoems);
  }

  updatePoems(poemsUpdate) {
    this.http.put(this.urlPoems, poemsUpdate, this.httpOptions).subscribe();
  }

  getVersion() {
    return this.http.get(this.urlVersion);
  }

  updateVersion(version) {
    this.http.put(this.urlVersion, version, this.httpOptions).subscribe();
  }

}
