import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from './app.component';
import {WelcomeComponent} from "./welcome.component";

// For Testing
import { APP_BASE_HREF } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
