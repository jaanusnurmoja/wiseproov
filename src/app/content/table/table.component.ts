import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  loendiStat: any;
  inimesteLoend: any;
  sliceInimesed: any;
  total: number = 0;
  limit:number = 10;
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

  constructor() { }

  ngOnInit(): void {
   this.getTotal();
   this.setSortableFieldNames();
   this.setSortToggleNameAndSort('default','sort');
  }

  getTotal(): void {
    fetch('https://midaiganes.irw.ee/api/list?limit=0')
    .then(r => r.json())
    .then(t => this.setTotal(t));
  }

  setTotal(t): void {
    this.total = typeof t === 'number' ? t : t.stats.total;
    this.loendJaStatOrig(this.total);
  }

  switchTotals(altTotal): any {
    let total = this.total != altTotal ? altTotal : this.loendiStat.total;
    let alt = this.total == altTotal ? this.total : altTotal;
    this.setTotal(total);
    return alt;
  }

  loendJaStatOrig(total, param = ''): void {
    fetch('https://midaiganes.irw.ee/api/list?limit=' + total + param)
    .then(response => response.json())
    .then(j => this.loendJaStatParsed(j));
  }


  loendJaStatParsed(j): void {

    let loendiStat = j.stats;
    let inimesteLoend = j.list;

    for (let inimene of inimesteLoend) {
      inimene.firstname = inimene.firstname.replace('\u200e', '');
      inimene.surname = inimene.surname.replace('\u200e', '');
      let sugu:string = '';
      sugu = inimene.sex == 'm' ? 'Mees' : 'Naine';
      inimene.sex = sugu;
      this.personalIdToFormattedDate(inimene.personal_code);
      inimene.synna = this.synna;
    }

    this.loendiStat = loendiStat;
    this.inimesteLoend = inimesteLoend;
    this.setSliceInimesed(inimesteLoend, this.start, this.next);
    let pages = Math.ceil(this.total / this.limit);
    this.pageTotal = pages;
    this.lastPageIndex = this.pageTotal - 1;

    let offsets:{pageIndex: number, page: number, value: number, next: number}[] = [];

    for (let i = 0; i < pages; i++) {
      let osValue = i * this.limit;
      let next = osValue + this.limit;
      offsets[i] = {"pageIndex": i,"page": i+1, "value": osValue, "next": next};
    }
    this.offsets = offsets;
    this.firstOffset = offsets[0];
  }

     setSortToggleNameAndSort(sortableField, toggleName): void {
        const unsorted = this.inimesteLoend;
        let loend = this.inimesteLoend;
        let sortNames:any = {};
        let sortedData:any[] = [];
        let finalSort:any[] = [];
        let asc:boolean = false;
        let desc:boolean = false;
        let none:boolean = false;
        let sn:string = 'sort';
        if (toggleName =='') {
          sn = 'sort';
        }
        if (toggleName =='sort') {
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

        if (sortableField == 'default') sortNames.default = 'sort';
        if (sortableField == 'firstname'){
            sortNames.firstname = sn;
            sortedData = loend.sort((a, b) => (this.sortCompare(a.firstname, b.firstname, asc, desc)));
         }
        if (sortableField == 'surname') {
          sortNames.surname = sn;
          sortedData = loend.sort((a, b) => (this.sortCompare(a.surname, b.surname, asc, desc)));
        }
        if (sortableField == 'sex') {
          sortNames.sex = sn;
          sortedData = loend.sort((a, b) => (this.sortCompare(a.sex, b.sex, asc, desc)));
        }
        if (sortableField == 'birthdate') {
          sortNames.personal_code = sn;
          sortedData = loend.sort((a, b) => (this.sortCompare(a.personal_code, b.personal_code, asc, desc)));
        }
        if (sortableField == '') {
            sortNames.default = 'sort';
            sortNames.firstname = 'sort';
            sortNames.surname = 'sort';
            sortNames.sex = 'sort';
            sortNames.personal_code = 'sort';
        }

        this.sortToggleName = sortNames;
       if (none) {
          this.reset();
        } else {
         this.inimesteLoend = sortedData;
       }
        //console.log(this.sortToggleName,this.inimesteLoend[0], unsorted[0]);
        this.setSliceInimesed(this.inimesteLoend, this.start, this.next);
        //this.sortToggleName(toggleName);
     }

  setSliceInimesed(inimesed = this.inimesteLoend, start?:number, next?:number): void {
    if (typeof start === 'undefined') start = 0;
    if (typeof next === 'undefined') next = this.limit;
    this.start = start;
    this.next = next;
    this.sliceInimesed = inimesed.slice(start,next);
    //console.log(this.sliceInimesed);
  }

  activeTr(id): void {
    this.isActive = this.isActive == id ? false : id;
 }

  personalIdToFormattedDate(personalId):void {
    let idAsString = String(personalId);
    let sajandiArv = ['5','6'].includes(idAsString[0]) ? '20' : '19';
    let aasta = sajandiArv + idAsString.substring(1,3);
    let kuu = idAsString.substring(3,5);
    let paev = idAsString.substring(5,7);
    this.synna = paev + '.' + kuu + '.' + aasta;
  }

  setSortableFieldNames(): void {
    const field:any = {};
    field.firstname = 'firstname';
    field.surname = 'surname';
    field.sex = 'sex';
    field.birthdate = 'birthdate';
    field.personal_code = 'personal_code';
    this.sortableField = field;
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

   reset(): void {
    this.loendJaStatOrig(this.total);
   }
}
