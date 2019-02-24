import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ErrorStateMatcher,
  MatButtonModule,
  MatCardModule, MatDatepickerModule, MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatNativeDateModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonFormInputComponent} from "./component/common-form-input.component";
import {BaseFormHttpService} from "./service/base-form-http.service";
import {BaseFormValidatorService} from "./service/base-form-validator.service";
import {BaseErrorStateMatcher} from "./error/base-error-state-matcher";

@NgModule({
  declarations: [
    CommonFormInputComponent
  ],
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
    CommonFormInputComponent
  ],
  providers: [
    {provide: ErrorStateMatcher, useValue: new BaseErrorStateMatcher()},
    BaseFormHttpService,
    BaseFormValidatorService
  ]
})
export class CommonFormModule { }
