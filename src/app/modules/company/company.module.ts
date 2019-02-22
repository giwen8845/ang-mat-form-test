import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormComponent } from './company-form/company-form.component';
import {
  ErrorStateMatcher,
  MatButtonModule,
  MatCardModule, MatDatepickerModule, MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatNativeDateModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CompanyFormHttpService} from "./company-form/company-form-http.service";
import {BaseErrorStateMatcher} from "../../common/validation/base-error-state-matcher";

@NgModule({
  declarations: [CompanyFormComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  exports: [
    CompanyFormComponent
  ],
  providers: [
    CompanyFormHttpService,
    {provide: ErrorStateMatcher, useValue: new BaseErrorStateMatcher()},
  ]
})
export class CompanyModule { }
