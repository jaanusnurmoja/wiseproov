import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  menuToggleName: any;
  noConnection: any;

  constructor() {}

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
