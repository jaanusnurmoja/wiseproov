import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  baseUrl: string = 'https://midaiganes.irw.ee/api/';
  totalAvailableItemsUrl = this.baseUrl + 'list?limit=0';
  articleBaseUrl: string = this.baseUrl + 'article/';
  listBaseUrl: string = this.baseUrl + 'list?limit=';
  totalAvailable: number = 0;
  menuToggleName: any;
  noConnection: any;

  constructor(private http: HttpClient) {}

  getTotalOfAllItems() {
    this.http.get(this.totalAvailableItemsUrl)
    .subscribe((data:any) => this.totalAvailable = data.stats.total);
  }

  getData(what, code?:any) {
    // now returns an Observable of Config
    let dataUrl: string = '';
    if (what === 'article') {
      dataUrl = this.articleBaseUrl + code;
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
    setTimeout(() => {
      this.noConnection =
        'Näib, et meil on probleeme andmete kättesaamisega andmeallikast. Palume võimalusel anda sellest teada haldurile haldur@seeleht.ee';
    }, 5000);
  }
}
