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
  loendiStat: any;
  total: any;

  constructor(
    private _Activatedroute: ActivatedRoute,
    public common: CommonService
  ) {}

  ngOnInit(): void {
    this.getTotal();
  }

  getTotal(): void {
    fetch('https://midaiganes.irw.ee/api/list?limit=0')
      .then((r) => r.json())
      .then((t) => this.setTotal(t));
  }

  setTotal(t): void {
    this.total = typeof t === 'number' ? t : t.stats.total;
    this.loendJaStatOrig(this.total);
  }

  loendJaStatOrig(total): void {
    this.common.noConnection = null;
    this.common.waitForConnection();
    fetch('https://midaiganes.irw.ee/api/list?limit=' + total)
      .then((response) => response.json())
      .then((j) => this.setArticleId(j));
  }

  setArticleId(j): void {
    this.loendiStat = j.stats;
    let ids = j.list.map((t) => t.id);
    let random = ids[Math.floor(Math.random() * ids.length)];
    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id') || random;
      this.getArticleFromUrl(this.id);
    });
  }

  getArticleFromUrl(id): void {
    fetch('https://midaiganes.irw.ee/api/list/' + id)
      .then((response) => response.json())
      .then((a) => this.setArticle(a));
  }

  setArticle(a): void {
    this.article = a;
  }
}
