import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {CompanyFormHttpService} from "./company-form-http.service";

@Component({
  selector: 'app-company-form',
  template: `
    <mat-grid-list cols="4" [gutterSize]="'20'">
      <mat-grid-tile [colspan]="2" [rowspan]="2" class="example-viewer-wrapper">
        <div class="example-viewer-wrapper-inner">
          <div class="example-viewer-title">Form </div>
          <div class="example-viewer-body">
            <form class="example-form" [formGroup]="profileForm" (ngSubmit)="onSubmit()">

              <mat-form-field class="example-full-width" >
                <input matInput formControlName="name" placeholder="Név">
                <mat-error *ngIf="profileForm.controls.name.hasError('required')">
                  Angular validáció: Név kitöltése <strong>kötelező!</strong>
                </mat-error>
                <mat-error *ngIf="profileForm.controls.name.hasError('serverValid')">
                  <strong>teszt1</strong>
                </mat-error>
              </mat-form-field>

              <mat-form-field class="example-full-width" >
                <input matInput formControlName="email" placeholder="Email">
                <mat-error *ngIf="profileForm.controls.email.hasError('email') && !profileForm.controls.email.hasError('required')">
                  Angular validáció: Please enter a valid email address
                </mat-error>
                <mat-error *ngIf="profileForm.controls.email.hasError('required')">
                  Angular validáció: Email is <strong>required</strong>
                </mat-error>
              </mat-form-field>

              <mat-form-field class="example-full-width" >
                <input matInput [matDatepicker]="picker" formControlName="date" placeholder="Dátum">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>

              <div class="form-group" formGroupName="address">
                <mat-form-field class="example-half-width" style="margin-right: 6%">
                  <input matInput formControlName="city" placeholder="Város">
                </mat-form-field>
                <mat-form-field class="example-half-width" >
                  <input matInput formControlName="street" placeholder="Utca">
                </mat-form-field>
              </div>

              <div class="form-group" formGroupName="attributes">
                <mat-form-field class="example-full-width"  *ngFor="let attribute of profileForm.controls.attributes.controls; let i=index">
                  <input matInput [formControlName]="i" placeholder="{{i+1}}. Elem">
                </mat-form-field>
                <button mat-button (click)="addAttribute($event)">Új elem</button>
              </div>

              <button mat-button color="primary" type="submit" [disabled]="!profileForm.valid">Mentés</button>
            </form>
          </div>
        </div>
      </mat-grid-tile>
      <mat-grid-tile  [colspan]="1" [rowspan]="1" class="example-viewer-wrapper">
        <div class="example-viewer-wrapper-inner">
          <div class="example-viewer-title">Kliens oldali model: {{ profileForm.status }}</div>
          <div class="example-viewer-body">
            <pre>
              {{ profileForm.value | json }}
            </pre>
          </div>
        </div>
      </mat-grid-tile>
      <mat-grid-tile  [colspan]="1" [rowspan]="1" class="example-viewer-wrapper">
        <div class="example-viewer-wrapper-inner">
          <div class="example-viewer-title">Szerver oldali model:</div>
          <div class="example-viewer-body">
            <pre>
              {{ service.modelOnServer | json }}
            </pre>
          </div>
        </div>
      </mat-grid-tile>
    </mat-grid-list>
  `
})
export class CompanyFormComponent {


  constructor(private fb: FormBuilder, public service:CompanyFormHttpService) { }

  profileForm = this.fb.group({
    name: ['', [
      Validators.required,
      this.service.serverValid.bind(this.service)
    ]
    ],
    email: ['', [
      Validators.required,
      Validators.email,
      this.service.serverValid.bind(this.service)
    ]
    ],
    date: [''],
    address: this.fb.group({
      city: [''],
      street: ['', this.service.serverValid.bind(this.service)],
    }),
    attributes: this.fb.array([
      this.fb.control('', this.service.serverValid.bind(this.service))
    ])
  });

  get attributes() {
    return this.profileForm.get('attributes') as FormArray;
  }

  addAttribute($event) {
    this.attributes.push(this.fb.control('', this.service.serverValid.bind(this.service)));

    // Stop event propagation to prevent submit
    $event.preventDefault();
    $event.stopPropagation();
  }

  onSubmit() {
    this.service.mockFormPostToServer(this.profileForm.value);
  }


}
