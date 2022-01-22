import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: any;
  id: any;

  constructor(private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
        this.id = params.get('id') || '4e34a5c4';
        this.getArticleFromUrl(this.id);
    });
  }

  getArticleFromUrl(id): void {
    fetch('https://midaiganes.irw.ee/api/list/' + id)
    .then(response => response.json())
    .then(a => this.setArticle(a));
  }

  setArticle(a) : void {
    this.article = a;
  }
}
