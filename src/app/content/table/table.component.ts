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
  offsets: any;
  isActive: any = false;
  synna: string = '';
  sortableField: any;
  sortToggleName: any;

  constructor() { }

  ngOnInit(): void {
   this.getTotal();
 //  this.loendJaStatOrig();
   this.setSortableFieldNames();
   this.setSortToggleName('default','sort');
   this.setSliceInimesed(this.inimesteLoend, 0, 10)
   //this.loendJaStatParsed();
    //this.inimesed();
  }
  getTotal(): void {
    fetch('https://midaiganes.irw.ee/api/list?limit=0')
    .then(r => r.json())
    .then(t => this.setTotal(t));
  }

  setTotal(t): void {
    this.total = t.stats.total;
    this.loendJaStatOrig(this.total);
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
      let sugu:string = '';
      sugu = inimene.sex == 'm' ? 'Mees' : 'Naine';
      inimene.sex = sugu;
      this.personalIdToFormattedDate(inimene.personal_code);
      inimene.synna = this.synna;
    }

    this.loendiStat = loendiStat;
    this.inimesteLoend = inimesteLoend;
    this.setSliceInimesed(inimesteLoend, 0, 10)

    let pages = Math.ceil(this.total / this.limit);
    let offsets:{pageIndex: number, page: number, value: number, next: number}[] = [];

    for (let i = 0; i < pages; i++) {
      let osValue = i * this.limit;
      let next = osValue + this.limit;
      offsets[i] = {"pageIndex": i,"page": i+1, "value": osValue, "next": next};
    }

    this.offsets = offsets;
    // this.getFullData(this.loendiStat.total);

    console.log(this.inimesteLoend);
    console.log(this.loendiStat.total);
    console.log(this.offsets);
  }


     setSortToggleName(sortableField, toggleName): void {
        let sortNames:any = {};
        let sortedData:any[] = [];
        let finalSort:any[] = [];
        let asc:boolean = false;
        let desc:boolean = false;
        let none:boolean = true;
        let sn:string = 'sort';
        if (toggleName =='') sn = 'sort';
        if (toggleName =='sort') sn = 'sort-up';
        if (toggleName == 'sort-up') sn = 'sort-down';
        if (toggleName == 'sort-down') sn = 'sort';
        asc = sn == 'sort-up' ? true : false;
        desc = sn == 'sort-down' ? true : false;
        none = sn == 'sort' ? true : false;
        if (sortableField == 'default') sortNames.default = 'sort';
        if (sortableField == 'firstname'){
          sortNames.firstname = sn;
        }
        if (sortableField == 'surname') {
          sortNames.surname = sn;
          sortedData = this.inimesteLoend.sort((a, b) => (this.sortCompare(a.surname, b.surname, asc, desc)));
        }
        if (sortableField == 'sex') {sortNames.sex = sn;}
        if (sortableField == 'birthdate') {sortNames.personal_code = sn;}
        if (sortableField == '') {
            sortNames.default = 'sort';
            sortNames.firstname = 'sort';
            sortNames.surname = 'sort';
            sortNames.sex = 'sort';
            sortNames.personal_code = 'sort';
        }

        this.sortToggleName = sortNames;
        this.inimesteLoend = sortedData;
        this.setSliceInimesed(sortedData, 0, 10)
        if (none) this.reset();
        console.log(this.sortToggleName);
        //this.sortToggleName(toggleName);
     }

  setSliceInimesed(inimesed, start = 0, next = 10): void {
    if (!inimesed) inimesed = this.inimesteLoend;
    this.sliceInimesed = inimesed.slice(start,next);
    console.log(this.sliceInimesed);
  }

  activeTr(id): void {
    this.isActive = this.isActive == id ? false : id;
 }

  personalIdToFormattedDate(personalId):void {
    let idAsString = String(personalId);
    let sajandiArv = ['5','6'].includes(idAsString[0]) ? '20' : '19';
    let aasta = sajandiArv + idAsString.substring(1,3);void
    console.log(idAsString);
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
