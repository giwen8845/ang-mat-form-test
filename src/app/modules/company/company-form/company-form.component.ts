import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {FormUtil} from "../../../common/form/form-util";
import {BaseFormHttpService} from "../../../common/form/service/base-form-http.service";
import {BaseFormValidatorService} from "../../../common/form/service/base-form-validator.service";
import {BaseFormBuilderService} from "../../../common/form/service/base-form-builder.service";

@Component({
  selector: 'app-company-form',
  template: `
    <mat-grid-list cols="4" [gutterSize]="'20'">
      <mat-grid-tile [colspan]="2" [rowspan]="2" class="example-viewer-wrapper">
        <div class="example-viewer-wrapper-inner">
          <div class="example-viewer-title">Form </div>
          <div class="example-viewer-body">
            <form class="example-form" [formGroup]="companyForm" (ngSubmit)="onSubmit()">

              <mat-form-field class="example-full-width" >
                <input matInput formControlName="name" placeholder="Cég neve">
                <mat-error *ngIf="companyForm.controls.name.hasError('required')">
                  Angular validáció: Név kitöltése <strong>kötelező!</strong>
                </mat-error>
                <mat-error *ngIf="companyForm.controls.name.hasError('serverValid')">
                  <strong>{{companyForm.controls.name.errors.serverValid.text}}</strong>
                </mat-error>
              </mat-form-field>

              <mat-form-field class="example-full-width" >
                <input matInput formControlName="email" placeholder="Email">
                <mat-error *ngIf="companyForm.controls.email.hasError('email') && !companyForm.controls.email.hasError('required')">
                  Angular validáció: Please enter a valid email address
                </mat-error>
                <mat-error *ngIf="companyForm.controls.email.hasError('required')">
                  Angular validáció: Email is <strong>required</strong>
                </mat-error>
                <mat-error *ngIf="companyForm.controls.email.hasError('serverValid')">
                  <strong>{{companyForm.controls.email.errors.serverValid.text}}</strong>
                </mat-error>
              </mat-form-field>

              <mat-form-field class="example-full-width" >
                <input matInput [matDatepicker]="picker" formControlName="date" placeholder="Dátum">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-error *ngIf="companyForm.controls.date.hasError('serverValid')">
                  <strong>{{companyForm.controls.date.errors.serverValid.text}}</strong>
                </mat-error>
              </mat-form-field>

              <div class="form-group" formGroupName="contact">
                <mat-form-field class="example-half-width" style="margin-right: 6%">
                  <input matInput formControlName="address" placeholder="Cím">
                  <mat-error *ngIf="companyForm.controls.contact.controls.address.hasError('serverValid')">
                    <strong>{{companyForm.controls.contact.controls.address.errors.serverValid.text}}</strong>
                  </mat-error>
                </mat-form-field>
                <mat-form-field class="example-half-width" >
                  <input matInput formControlName="phone" placeholder="Telefon">
                  <mat-error *ngIf="companyForm.controls.contact.controls.phone.hasError('serverValid')">
                    <strong>{{companyForm.controls.contact.controls.phone.errors.serverValid.text}}</strong>
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-array" formArrayName="employees">
                <ng-container *ngFor="let employee of companyForm.controls.employees.controls; let i=index">
                  <div class="form-group" [formGroup]="employee">
                    <mat-form-field class="example-full-width" >
                      <input matInput formControlName="name" placeholder="{{i}}. Alkalmazott">
                      <mat-error *ngIf="companyForm.controls.employees.controls[i].controls.name.hasError('serverValid')">
                        <strong>{{companyForm.controls.employees.controls[i].controls.name.errors.serverValid.text}}</strong>
                      </mat-error>
                    </mat-form-field>
                  </div>
                </ng-container>
                <button mat-button (click)="addEmployee($event)">Új Alkalmazott</button>
              </div>

              <button mat-button color="primary" type="submit" [disabled]="hasAnyClientValidationErrors()">Mentés</button>
            </form>
          </div>
        </div>
      </mat-grid-tile>
      <mat-grid-tile  [colspan]="1" [rowspan]="1" class="example-viewer-wrapper">
        <div class="example-viewer-wrapper-inner">
          <div class="example-viewer-title">Kliens oldali model: {{ companyForm.status }}</div>
          <div class="example-viewer-body">
            <pre>
              {{ companyForm.value | json }}
            </pre>
          </div>
        </div>
      </mat-grid-tile>
      <mat-grid-tile  [colspan]="1" [rowspan]="1" class="example-viewer-wrapper">
        <div class="example-viewer-wrapper-inner">
          <div class="example-viewer-title">Szerver oldali model:</div>
          <div class="example-viewer-body">
            <pre>
              {{ httpService.modelOnServer | json }}
            </pre>
          </div>
        </div>
      </mat-grid-tile>
      <mat-grid-tile  [colspan]="2" [rowspan]="1" class="example-viewer-wrapper">
        <div class="example-viewer-wrapper-inner">
          <div class="example-viewer-title">Szerver oldali validáció response:</div>
          <div class="example-viewer-body">
            <div class="server-validation-wrapper">
              <ng-container *ngFor="let key of objectKeys(httpService.mockedServerValidationResultsOnServer)" >
                <div class="server-validation-key">{{key}}:</div>
                <div class="server-validation-value"><input type="text" [(ngModel)]="httpService.mockedServerValidationResultsOnServer[key]"></div>
              </ng-container>
            </div>
          </div>
        </div>
      </mat-grid-tile>
    </mat-grid-list>
  `
})
export class CompanyFormComponent implements OnInit {

  objectKeys = Object.keys;

  constructor(
    private fb: BaseFormBuilderService,
    public httpService:BaseFormHttpService,
    public validatorService:BaseFormValidatorService
  ) { }

  companyForm = this.fb.group({
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

  get employees() {
    return this.companyForm.get('employees') as FormArray;
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

  onSubmit() {
    /**
     * Elküld: form adatok
     * Válasz: form adatok + validáció
     * TODO más is érkezhet, globális üzenetek, stb, illetve csak mockolt, hogy melyik adat hol lakik, validáció egyelőre a serviceben
     */
    this.httpService.mockFormPostToServer(this.companyForm.value)
      .subscribe(value => {
        this.companyForm.setValue(value)
    });
  }

  hasAnyClientValidationErrors() : boolean {
    return FormUtil.hasFormGroupClientValidationErrors(this.companyForm);
  }

  ngOnInit() {
    this.validatorService.updateMockServerValidationKeys(this.companyForm);
    this.companyForm.valueChanges.subscribe(form => {
      this.validatorService.updateMockServerValidationKeys(this.companyForm);
    });

  }
}
