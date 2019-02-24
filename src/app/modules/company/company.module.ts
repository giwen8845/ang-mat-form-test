import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormComponent } from './company-form/company-form.component';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule, MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatNativeDateModule, MatSlideToggleModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonFormModule} from "../../common/form/common-form.module";
import {MockServerValidationComponent} from "./component/mock-server-validation.component";
import {MockServerModelComponent} from "./component/mock-server-model.component";
import {MockClientModelComponent} from "./component/mock-client-model.component";

@NgModule({
  declarations: [
    CompanyFormComponent,
    MockServerValidationComponent,
    MockServerModelComponent,
    MockClientModelComponent
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
    MatFormFieldModule,
    MatSlideToggleModule,
    CommonFormModule
  ],
  exports: [
    CompanyFormComponent
  ],
  providers: [
  ]
})
export class CompanyModule { }
