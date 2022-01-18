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

  constructor() { }

  ngOnInit(): void {
    this.loendJaStatOrig();
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
/*
 showIntroToggle(id):void {
  id = !id;
  this.showIntro = id;
 }
 */
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
  tabeliLehed(loendiStat): void {
    let pages = loendiStat.total / loendiStat.limit;
    let offsets:number[];
    for (let i = 0; i < pages; i++) {
    offsets[i] = i * loendiStat.limit;
    }
    this.offsets = offsets;
    console.log(this.offsets);
  } */
}
