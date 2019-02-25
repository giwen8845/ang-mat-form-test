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

              <mat-form-field class="example-full-width" >
                <input matInput formControlName="name" placeholder="Cég neve">
                <mat-error *ngIf="formRoot.controls.name.hasError('required')">
                  Angular validáció: Név kitöltése <strong>kötelező!</strong>
                </mat-error>
                <mat-error *ngIf="formRoot.controls.name.hasError('serverValid')">
                  <strong>{{formRoot.controls.name.errors.serverValid.text}}</strong>
                </mat-error>
              </mat-form-field>

              <mat-form-field class="example-full-width" >
                <input matInput formControlName="email" placeholder="Email">
                <mat-error *ngIf="formRoot.controls.email.hasError('email') && !formRoot.controls.email.hasError('required')">
                  Angular validáció: Please enter a valid email address
                </mat-error>
                <mat-error *ngIf="formRoot.controls.email.hasError('required')">
                  Angular validáció: Email is <strong>required</strong>
                </mat-error>
                <mat-error *ngIf="formRoot.controls.email.hasError('serverValid')">
                  <strong>{{formRoot.controls.email.errors.serverValid.text}}</strong>
                </mat-error>
              </mat-form-field>

              <mat-form-field class="example-full-width" >
                <input matInput [matDatepicker]="picker" formControlName="date" placeholder="Dátum">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-error *ngIf="formRoot.controls.date.hasError('serverValid')">
                  <strong>{{formRoot.controls.date.errors.serverValid.text}}</strong>
                </mat-error>
              </mat-form-field>

              <div class="form-group" formGroupName="contact">
                <mat-form-field class="example-half-width" style="margin-right: 6%">
                  <input matInput formControlName="address" placeholder="Cím">
                  <mat-error *ngIf="formRoot.controls.contact.controls.address.hasError('serverValid')">
                    <strong>{{formRoot.controls.contact.controls.address.errors.serverValid.text}}</strong>
                  </mat-error>
                </mat-form-field>
                <mat-form-field class="example-half-width" >
                  <input matInput formControlName="phone" placeholder="Telefon">
                  <mat-error *ngIf="formRoot.controls.contact.controls.phone.hasError('serverValid')">
                    <strong>{{formRoot.controls.contact.controls.phone.errors.serverValid.text}}</strong>
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-array" formArrayName="employees">
                <ng-container *ngFor="let employee of formRoot.controls.employees.controls; let i=index">
                  <div class="form-group" [formGroup]="employee">
                    <mat-form-field class="example-half-width" >
                      <input matInput formControlName="name" placeholder="{{i}}. Alkalmazott">
                      <mat-error *ngIf="formRoot.controls.employees.controls[i].controls.name.hasError('serverValid')">
                        <strong>{{formRoot.controls.employees.controls[i].controls.name.errors.serverValid.text}}</strong>
                      </mat-error>
                    </mat-form-field>
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
