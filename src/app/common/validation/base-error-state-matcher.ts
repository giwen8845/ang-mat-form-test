import {ErrorStateMatcher} from "@angular/material";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable()
export class BaseErrorStateMatcher implements ErrorStateMatcher {

  constructor(){}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
