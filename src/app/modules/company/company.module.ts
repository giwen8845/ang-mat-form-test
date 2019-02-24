import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormComponent } from './company-form/company-form.component';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule, MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatNativeDateModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonFormModule} from "../../common/form/common-form.module";

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
    MatFormFieldModule,
    CommonFormModule
  ],
  exports: [
    CompanyFormComponent
  ],
  providers: [
  ]
})
export class CompanyModule { }
