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
  url = 'https://api.myjson.com/bins/htb96';

  getApiData() {
    return this.http.get(this.url);
  }
  updateData(data) {
    console.log(data);
    this.http.put(this.url, data, this.httpOptions).subscribe(() => {});
  }
}
