import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'common-email-input',
  template: `
    <mat-form-field class="example-full-width">
      <input matInput [formControl]="control" placeholder="{{text}}">
      
      <mat-error *ngIf="control.hasError('required')">
        Angular validáció: {{text}} is <strong>required</strong>
      </mat-error>
      <mat-error *ngIf="control.hasError('email') && !control.hasError('required')">
        Angular validáció: Please enter a valid email address
      </mat-error>
      <mat-error *ngIf="control.hasError('serverValid')">
        <strong>{{control.errors.serverValid.text}}</strong>
      </mat-error>
    </mat-form-field>
  `
})
export class CommonEmailInputComponent {

  @Input()
  public control:AbstractControl = null;

  @Input()
  public text:string = "";

  @Input()
  public wrapperClass:string = "example-full-width";
}
