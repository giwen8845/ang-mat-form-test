import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DATE_LOCALE,
} from "@angular/material";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CompanyModule} from "./modules/company/company.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CompanyModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'hu'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
