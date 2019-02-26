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
import {CommonTextInputComponent} from "./component/common-text-input.component";
import {BaseFormHttpService} from "./service/base-form-http.service";
import {BaseFormValidatorService} from "./service/base-form-validator.service";
import {BaseErrorStateMatcher} from "./error/base-error-state-matcher";
import {BaseFormBuilderService} from "./service/base-form-builder.service";
import {CommonDateInputComponent} from "./component/common-date-input.component";
import {CommonEmailInputComponent} from "./component/common-email-input.component";

@NgModule({
  declarations: [
    CommonTextInputComponent,
    CommonDateInputComponent,
    CommonEmailInputComponent
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
    CommonTextInputComponent,
    CommonDateInputComponent,
    CommonEmailInputComponent
  ],
  providers: [
    {provide: ErrorStateMatcher, useValue: new BaseErrorStateMatcher()},
    BaseFormHttpService,
    BaseFormValidatorService,
    BaseFormBuilderService
  ]
})
export class CommonFormModule { }
