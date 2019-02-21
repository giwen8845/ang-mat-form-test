import { Component } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  template: `
    <mat-grid-list cols="2">
      <mat-grid-tile>
        <mat-card>
          <mat-card-title>Form </mat-card-title>
          <mat-card-content>
            <form class="example-form" [formGroup]="profileForm" (ngSubmit)="onSubmit()">

              <mat-form-field class="example-full-width" >
                <input matInput formControlName="name" placeholder="Név">
                <mat-error *ngIf="profileForm.controls.name.hasError('required')">
                  Angular validáció: Név kitöltése <strong>kötelező!</strong>
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
                <button mat-button (click)="addAttribute()">Új elem</button>
              </div>
        
              <button mat-button color="primary" type="submit" [disabled]="!profileForm.valid">Mentés</button>
            </form>
          </mat-card-content>
        </mat-card>
      </mat-grid-tile>
      <mat-grid-tile>
        <mat-card>
          <mat-card-title>Form Status: {{ profileForm.status }}</mat-card-title>
          <mat-card-subtitle>Form Value: </mat-card-subtitle>
          <mat-card-content>
            <pre>
              {{ profileForm.value | json }}
            </pre>
          </mat-card-content>
        </mat-card>
      </mat-grid-tile>
    </mat-grid-list>
  `
})
export class AppComponent {

  constructor(private fb: FormBuilder, private service:AppService) { }

  profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [
      Validators.required, Validators.email
      ]
    ],
    date: [''],
    address: this.fb.group({
      city: [''],
      street: [''],
    }),
    attributes: this.fb.array([
      this.fb.control('')
    ])
  });

  get attributes() {
    return this.profileForm.get('attributes') as FormArray;
  }

  addAttribute() {
    this.attributes.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
