import { Component, OnInit } from '@angular/core';
import { parsePhoneNumber } from 'libphonenumber-js';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  inimesteLoend: any;
  sliceInimesed: any;
  limit: number = 10;
  start = 0;
  next = this.limit;
  pageTotal: any;
  offsets: any;
  firstOffset: any;
  lastPageIndex: any;
  pageIndex: number = 0;
  isActive: any = false;
  synna: string = '';
  sortableField: any;
  sortToggleName: any;
  debug:any;

  constructor(public common: CommonService) {
}

  ngOnInit(): void {
    this.listRows();
    this.setSortToggleNameAndSort('default', 'sort');
  }

  listRows() {
    this.common.waitForConnection();
    //if (!this.common.getData()) //for debug
    this.common.getData()
    .subscribe((d:any) => {
      this.debug = d.list[0].firstname + ' ' + d.list[0].surname;
      this.loendJaStatParsed(d);
    });
  }

  loendJaStatParsed(d): void {
    let inimesteLoend = d.list;

    for (let inimene of inimesteLoend) {
      inimene.firstname = inimene.firstname.replace('\u200e', '');
      inimene.surname = inimene.surname.replace('\u200e', '');
      
      let sugu: string = '';
      sugu = inimene.sex == 'm' ? 'Mees' : 'Naine';
      inimene.sex = sugu;
      
      let sortedOrFormattedSynna = this.personalIdToSortableAndFormattedDate(inimene.personal_code);
      inimene.synna = sortedOrFormattedSynna.formatted;
      inimene.sortSynna = sortedOrFormattedSynna.sortable;
      
      let phoneNumber = parsePhoneNumber(inimene.phone);
      inimene.phone = phoneNumber.formatInternational();
    }

    this.inimesteLoend = inimesteLoend;
    this.setSliceInimesed(inimesteLoend, this.start, this.next);
    let pages = Math.ceil(this.common.totalAvailable / this.limit);
    this.pageTotal = pages;
    this.lastPageIndex = this.pageTotal - 1;

    let offsets: {
      pageIndex: number;
      page: number;
      value: number;
      next: number;
    }[] = [];

    for (let i = 0; i < pages; i++) {
      let osValue = i * this.limit;
      let next = osValue + this.limit;
      offsets[i] = { pageIndex: i, page: i + 1, value: osValue, next: next };
    }
    this.offsets = offsets;
    this.firstOffset = offsets[0];
  }

  setSortToggleNameAndSort(sortableField, toggleName): void {
    let loend = this.inimesteLoend;
    let sortNames: any = {};
    let sortedData: any[] = [];
    let asc: boolean = false;
    let desc: boolean = false;
    let none: boolean = false;
    let sn: string = 'sort';
    if (toggleName == '') {
      sn = 'sort';
    }
    if (toggleName == 'sort') {
      sn = 'sort-up';
      asc = true;
    }
    if (toggleName == 'sort-up') {
      sn = 'sort-down';
      desc = true;
    }
    if (toggleName == 'sort-down') {
      sn = 'sort';
      none = true;
    }

    if (sortableField == 'birthdate') sortableField = 'sortSynna';
    console.log(sortableField);

    if (sortableField.length > 0 && sortableField != 'default') {
      sortNames[sortableField] = sn;
      sortedData = loend.sort((a, b) =>
        this.sortCompare(a[sortableField], b[sortableField], asc, desc)
      );
    }

    if (sortableField == '' || sortableField == 'default') {
      sortNames.default = 'sort';
      sortNames.firstname = 'sort';
      sortNames.surname = 'sort';
      sortNames.sex = 'sort';
      sortNames.sortSynna = 'sort';
    }

    this.sortToggleName = sortNames;
    if (none) {
      this.reset();
    } else {
      this.inimesteLoend = sortedData;
    }
    this.setSliceInimesed(this.inimesteLoend, this.start, this.next);
  }

  navigate(target: string, pageIndex?: any, start?: any, next?: any) {
    if (target == 'eelmine' || target == 'järgmine' || target == 'viimane') {
      if (target == 'eelmine') {
        pageIndex =
          this.pageIndex - 1 < 0
            ? this.pageTotal + (this.pageIndex - 1)
            : this.pageIndex - 1;
      }
      if (target == 'järgmine') {
        pageIndex =
          this.pageIndex + 1 >= this.pageTotal
            ? this.pageIndex + 1 - this.pageTotal
            : pageIndex + 1;
      }
      start = this.offsets[pageIndex].value;
      next = this.offsets[pageIndex].next;
    }
    this.pageIndex = pageIndex;
    this.start = start;
    this.next = next;
    this.setSliceInimesed(this.inimesteLoend, this.start, this.next);
  }

  setSliceInimesed(
    inimesed = this.inimesteLoend,
    start?: number,
    next?: number
  ): void {
    if (typeof start === 'undefined') start = 0;
    if (typeof next === 'undefined') next = this.limit;
    this.start = start;
    this.next = next;
    this.sliceInimesed = inimesed.slice(start, next);
  }

  activeTr(id): void {
    this.isActive = this.isActive === id ? false : id;
  }

  personalIdToSortableAndFormattedDate(personalId): any {
    let synna: any = {};
    let idAsString = String(personalId);
    let sajandiArv = ['5', '6'].includes(idAsString[0]) ? '20' : '19';
    let aasta = sajandiArv + idAsString.substring(1, 3);
    synna.sortable = Number(aasta + idAsString.substring(3));
    let kuu = idAsString.substring(3, 5);
    let paev = idAsString.substring(5, 7);
    synna.formatted = paev + '.' + kuu + '.' + aasta;
    return synna;
  }

  sortCompare(prop1, prop2, asc, desc): number {
    if (asc == true) {
      return prop1 < prop2 ? -1 : 1;
    }
    if (desc == true) {
      return prop2 < prop1 ? -1 : 1;
    }
    return 0;
  }

  nupula(offset): boolean {
    if (this.pageIndex < 5) {
      return offset.value >= 0 && offset.value < 10 * this.limit;
    } else if (this.pageIndex >= this.pageTotal - 5) {
      return (
        offset.value >= (this.pageTotal - 10) * this.limit &&
        offset.value < this.common.totalAvailable
      );
    } else {
      return (
        offset.value >= this.start - 5 * this.limit &&
        offset.value < this.start + 5 * this.limit
      );
    }
  }

  nupulaKlass(offset) {
    return offset.pageIndex == this.pageIndex.toString() ||
      (!this.pageIndex && offset.pageIndex == '0')
      ? {
          'text-warning': true,
          'fw-bold': true,
          'fs-4': true,
          'text-light': false,
        }
      : {
          'btn-warning': false,
          'fw-bold': false,
          'fs-4': false,
          'text-light': true,
        };
  }

  reset(): void {
    this.listRows();
  }
}
