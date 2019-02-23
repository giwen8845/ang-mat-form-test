import {ErrorStateMatcher} from "@angular/material";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable()
export class BaseErrorStateMatcher implements ErrorStateMatcher {

  constructor(){}


  /**
   * TODO employee listát üres mezővel submitolva az állítja a validátor, hogy még nem volt submit...
   */
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    const isSubmitted = form && form.submitted;
    /**
     * Mindig mutassuk a szerverről érkezett hibákat az első mentés után, amíg egy mentés után el nem tűnnek
     */
    if(isSubmitted && control.errors && control.getError("serverValid")){
      return true;
    }
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
