import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  loendiStat: any;
  inimesteLoend: any;
  offsets: any;
  isActive: any = false;
  synna:string = '';
  sortableField: any;
  sortToggleName: any;

  constructor() { }

  ngOnInit(): void {
    this.loendJaStatOrig();
    this.setSortableFieldNames();
    this.setSortToggleName('default','sort');
    //this.loendJaStatParsed();
    //this.inimesed();
  }

  loendJaStatOrig(param = ''): void {
    fetch('https://midaiganes.irw.ee/api/list' + param)
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
    let pages = loendiStat.total / loendiStat.limit;
    let offsets:{page: number, value: number}[] = [];
      for (let i = 0; i < pages; i++) {
        offsets[i] = {"page": i+1, "value": i * loendiStat.limit};
      }
    this.offsets = offsets;
    console.log(this.inimesteLoend);
    console.log(this.loendiStat);
    console.log(this.offsets);
  }

  activeTr(id):void {
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

   setSortToggleName(sortableField, toggleName): void {
      let sortNames:any = {};
      let sortedData:any[] = [];
      let asc:boolean = false;
      let desc:boolean = false;
      let none:boolean = true;
      let sn:string = 'sort';
      const unsorted = this.inimesteLoend;
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
      if (none) this.reset();
      console.log(this.sortToggleName);
      //this.sortToggleName(toggleName);
   }

   reset(): any {
    this.loendJaStatOrig('?offset=' + this.loendiStat.offset);
   }

  /*
  inimesed(sortparams=[]): void {
    let inimesed = this.loendJaStat.list;
    let field = '';
    let direction = "";
    if (sortparams == []) {
      field = 'surname';
      direction = "asc";
    }
    else {
      field = sortparams[0];
      direction = sortparams[1];
    }
    inimesed.sort(sortData(field, direction));
    this.inimesteLoend = inimesed;
  }
 */
/*

function sortData(prop, asc) {
    return function (a, b) {
        if (asc == true) {
            return a.prop - b.prop;
        }
        else {
            return b.prop - a.prop;
        }
    }
}

*/
}
