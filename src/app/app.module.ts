import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TableComponent } from './content/table/table.component';
import { ArticleComponent } from './content/article/article.component';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFontAwesomeModule } from 'ngx-font-awesome';
import { MatChipsModule } from '@angular/material/chips';
import { CommonService } from './common.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    TableComponent,
    ArticleComponent,
    HomeComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxFontAwesomeModule,
    MatChipsModule,
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
