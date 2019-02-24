import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors} from "@angular/forms";
import {FormUtil} from "../form-util";
import {BaseFormHttpService} from "./base-form-http.service";

@Injectable()
export class BaseFormValidatorService {

  constructor(private httpService:BaseFormHttpService) { }

  public serverValid(control: AbstractControl): ValidationErrors | null {
    let controlFullName:string = FormUtil.getFormControlFullName(control);

    return controlFullName != null &&
    this.httpService.modelOnServer != null &&
    this.httpService.serverValidationResults != null &&
    this.httpService.serverValidationResults.hasOwnProperty(controlFullName) &&
    this.httpService.serverValidationResults[controlFullName] != null &&
    this.httpService.serverValidationResults[controlFullName].length > 0
      ?
      {'serverValid': {'text': this.httpService.serverValidationResults[controlFullName]}} : null;
  }

  public updateMockServerValidationKeys(form:AbstractControl) {
    let names: string[] = FormUtil.getAllFormControlFullName(form);
    let updatedServerValidationResults: { [key: string]: string } = {};
    for(let name of names){
      if(this.httpService.mockedServerValidationResultsOnServer.hasOwnProperty(name)){
        updatedServerValidationResults[name] = this.httpService.mockedServerValidationResultsOnServer[name];
      }
      else{
        updatedServerValidationResults[name] = "";
      }
    }
    this.httpService.mockedServerValidationResultsOnServer = updatedServerValidationResults;
  }
}
