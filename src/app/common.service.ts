import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  total: number = 0;
  loendJaStatParsed: any;
  menuToggleName: any;

  constructor() { }

    queryCountOfAllItems(): void {
      fetch('https://midaiganes.irw.ee/api/list?limit=0')
      .then(r => r.json())
      .then(t => this.setTotal(t));
    }

    setTotal(t): void {
      this.total = typeof t === 'number' ? t : t.stats.total;
      this.loendJaStatOrig(this.total);
    }

    loendJaStatOrig(total?, param?): void {
      if (!total) {total = this.total;}
      fetch('https://midaiganes.irw.ee/api/list?limit=' + total + param)
      .then(response => response.json())
      .then(j => this.setLoendJaStatParsed(j));
    }

    setLoendJaStatParsed(j): void {
      this.loendJaStatParsed = j;
    }

  setMenuToggle(word?: string) {
    let tn: string = 'bars';
    if (word == '') tn = 'bars';
    if (word == 'bars') tn = 'times';
    if (word == 'times') tn = 'bars';
    this.menuToggleName = tn;
  }
}
