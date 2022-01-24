import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuToggleName: any;

  constructor() { }

  ngOnInit(): void {
   this.setMenuToggle();
  }

  setMenuToggle(word?: string) {
    let tn: string = 'bars';
    if (word == '') tn = 'bars';
    if (word == 'bars') tn = 'times';
    if (word == 'times') tn = 'bars';
    this.menuToggleName = tn;
  }


}
