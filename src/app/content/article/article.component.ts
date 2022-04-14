import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article: any;
  id: any;
  total: any;

  constructor(
    private _Activatedroute: ActivatedRoute,
    public common: CommonService
  ) {}

  ngOnInit(): void {
    this.getDataForArticleId();
    //this.common.waitForConnection();
  }

  getDataForArticleId(): void {
    if (this.common.getData())
    this.common.getData()
    .subscribe((d:any) => {
      this.setArticleId(d);
    });
  }

  setArticleId(d): void {
    let ids = d.list.map((t) => t.id);
    let random = ids[Math.floor(Math.random() * ids.length)];
    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id') || random;
      this.getArticleFromUrl(this.id);
    });
  }

  getArticleFromUrl(id): void {
    this.common.waitForConnection();
    this.common.getData('article', id)
    .subscribe((a:any) => {
      this.setArticle(a);
    });
  }

  setArticle(a): void {
    //if (a.id != '6d3845d2') //debugi tarvis, isik: Tiina Kruglov
    this.article = a;
  }
}
