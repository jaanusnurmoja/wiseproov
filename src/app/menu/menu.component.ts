import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private common : CommonService) { }

  ngOnInit(): void {
    this.getMenuToggleName()
  }

  getMenuToggleName(): string {
    return this.common.menuToggleName;
  }
}
