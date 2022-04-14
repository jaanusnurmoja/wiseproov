import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  baseUrl: string = 'https://midaiganes.irw.ee/api/list/';
  listBaseUrl: string = this.baseUrl + '?limit=';
  totalAvailable: number = 500;
  menuToggleName: any;
  noConnection: any;

  constructor(private http: HttpClient) {
    this.getData();
  }

  getData(what = 'list', code?:any) {
    this.noConnection = null;
    let dataUrl: string = '';
    if (what === 'article') {
      dataUrl = this.baseUrl + code;
    }
    if (what === 'list') {
      dataUrl = this.listBaseUrl + (code ? code : this.totalAvailable);
    }
    return this.http.get(dataUrl);
  }


  setMenuToggle(word?: string) {
    let tn: string = 'bars';
    if (word == '') tn = 'bars';
    if (word == 'bars') tn = 'times';
    if (word == 'times') tn = 'bars';
    this.menuToggleName = tn;
  }

  waitForConnection() {
    let timeOut: any;
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      this.noConnection =
        'Näib, et meil on probleeme andmete kättesaamisega andmeallikast. Palume võimalusel anda sellest teada haldurile haldur@seeleht.ee';
    }, 5000);
  }
}
