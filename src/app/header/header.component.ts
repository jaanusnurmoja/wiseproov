import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private common : CommonService) { }

  ngOnInit(): void {
   this.setMenuToggle();
  }

  setMenuToggle(word?): void {
    this.common.setMenuToggle(word);
  }

  getMenuToggleName(): string {
    return this.common.menuToggleName;
  }

}
