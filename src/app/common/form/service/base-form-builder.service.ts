import { Injectable } from '@angular/core';
import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn
} from "@angular/forms";
import {BaseFormValidatorService} from "./base-form-validator.service";

@Injectable()
export class BaseFormBuilderService extends FormBuilder{

  constructor(private validatorService: BaseFormValidatorService) {
    super();
  }

  /**
   * Minden Form mezőhöz (control) szerver oldali validáció definiálása
   */
  control(
    formState: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): FormControl {
    if(validatorOrOpts == null){
      validatorOrOpts = this.validatorService.serverValid.bind(this.validatorService);
    }
    else if(Array.isArray(validatorOrOpts)){
      validatorOrOpts = [...validatorOrOpts, this.validatorService.serverValid.bind(this.validatorService)]
    }
    else {
      validatorOrOpts = [validatorOrOpts, this.validatorService.serverValid.bind(this.validatorService)]
    }
    return super.control(formState, validatorOrOpts, asyncValidator);
  };

}
