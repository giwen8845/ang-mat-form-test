import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'common-date-input',
  template: `
    <mat-form-field [ngClass]="wrapperClass">

      <input matInput [matDatepicker]="picker" [(formControl)]="control" placeholder="{{text}}">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      
      <mat-error *ngIf="control.hasError('required')">
        Angular validáció: {{text}} is <strong>required</strong>
      </mat-error>
      <mat-error *ngIf="control.hasError('serverValid')">
        <strong>{{control.errors.serverValid.text}}</strong>
      </mat-error>
    </mat-form-field>
  `
})
export class CommonDateInputComponent {

  @Input()
  public control:AbstractControl = null;

  @Input()
  public text:string = "";

  @Input()
  public wrapperClass:string = "example-full-width";
}
