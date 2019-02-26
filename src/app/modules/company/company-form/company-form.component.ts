import { Component, OnInit } from '@angular/core';
import {FormArray, Validators} from "@angular/forms";
import {BaseFormHttpService} from "../../../common/form/service/base-form-http.service";
import {BaseFormValidatorService} from "../../../common/form/service/base-form-validator.service";
import {BaseFormBuilderService} from "../../../common/form/service/base-form-builder.service";
import {BaseFormComponent} from "../../../common/form/component/base-form.component";

@Component({
  selector: 'app-company-form',
  template: `
    <mat-grid-list cols="4" [gutterSize]="'20'">
      <mat-grid-tile [colspan]="2" [rowspan]="2" class="example-viewer-wrapper">
        <div class="example-viewer-wrapper-inner">
          <div class="example-viewer-title">Kliens oldali form, mentésre szerver post, szerver validáció </div>
          <div class="example-viewer-body">
            <form class="example-form" [formGroup]="formRoot" (ngSubmit)="onSubmit()">

              <common-text-input
                [control]="formRoot.controls.name"
                [text]="'Cég neve'"
              ></common-text-input>
              
              <common-text-input
                [control]="formRoot.controls.email"
                [text]="'Email'"
              ></common-text-input>
              
              <common-date-input
                [(control)]="formRoot.controls.date"
                [text]="'Dátum'"
              ></common-date-input>

              <div class="form-group" formGroupName="contact">
                <common-text-input style="margin-right: 6%"
                  [control]="formRoot.controls.contact.controls.address"
                  [text]="'Cím'"
                  [wrapperClass]="'example-half-width'"
                ></common-text-input>
                <common-text-input
                  [control]="formRoot.controls.contact.controls.phone"
                  [text]="'Telefon'"
                  [wrapperClass]="'example-half-width'"
                ></common-text-input>
              </div>

              <div class="form-array" formArrayName="employees">
                <ng-container *ngFor="let employee of formRoot.controls.employees.controls; let i=index">
                  <div class="form-group" [formGroup]="employee">
                    <common-text-input
                      [control]="formRoot.controls.employees.controls[i].controls.name"
                      [text]="i + '. Alkalmazott'"
                      [wrapperClass]="'example-half-width'"
                    ></common-text-input>
                    <mat-slide-toggle formControlName="active" placeholder="Aktív" [color]="'primary'" style="margin-left: 25px"></mat-slide-toggle>
                    <button mat-button color="primary" (click)="removeEmployeeClickEvent($event, i)">Törlés</button>
                  </div>
                </ng-container>
                <button mat-button (click)="addEmployee($event)">Új Alkalmazott</button>
              </div>
              
              <button mat-button color="primary" type="submit" [disabled]="hasAnyClientValidationErrors()">Mentés</button>
            </form>
          </div>
        </div>
      </mat-grid-tile>
      
      <!-- Mock nézetek: -->
      <mat-grid-tile [colspan]="1" [rowspan]="1" class="example-viewer-wrapper">
        <div mock-client-model [formRoot]="formRoot" class="example-viewer-wrapper-inner"></div>
      </mat-grid-tile>
      <mat-grid-tile [colspan]="1" [rowspan]="1" class="example-viewer-wrapper">
        <div mock-server-model class="example-viewer-wrapper-inner"></div>
      </mat-grid-tile>
      <mat-grid-tile [colspan]="2" [rowspan]="1" class="example-viewer-wrapper">
        <div mock-server-validation class="example-viewer-wrapper-inner"></div>
      </mat-grid-tile>
    </mat-grid-list>
  `
})
export class CompanyFormComponent extends BaseFormComponent implements OnInit {

  constructor(
    private fb: BaseFormBuilderService,
    public httpService:BaseFormHttpService,
    public validatorService:BaseFormValidatorService
  ) {
    super(httpService, validatorService);
    this.initFormRoot();
  }

  private initFormRoot(){
    this.formRoot = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,]
      ],
      date: [''],
      contact: this.fb.group({
        address: [''],
        phone: [''],
      }),
      employees: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          active: [false],
        })
      ])
    });
  }

  get employees() {
    return this.formRoot.get('employees') as FormArray;
  }

  addEmployee($event) {
    this.employees.push(
      this.fb.group({
        name: ['', [
          Validators.required,
          this.validatorService.serverValid.bind(this.validatorService)
        ]],
        active: [false, this.validatorService.serverValid.bind(this.validatorService)],
      })
    );

    // Stop event propagation to prevent submit
    $event.preventDefault();
    $event.stopPropagation();
  }

  removeEmployeeClickEvent($event, i){
    this.employees.removeAt(i);
    // Stop event propagation to prevent submit
    $event.preventDefault();
    $event.stopPropagation();
  }
}
