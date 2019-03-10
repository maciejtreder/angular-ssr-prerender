import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent
  ],
  imports:[
 CommonModule,
NgtUniversalModule,
 
 TransferHttpCacheModule,
HttpClientModule,
 
    
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
})
export class AppModule { }
