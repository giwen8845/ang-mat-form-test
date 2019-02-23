import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors} from "@angular/forms";
import {Observable} from "rxjs";
import {Util} from "../../../common/util";

@Injectable()
export class CompanyFormHttpService {

  public modelOnServer:any = null;
  public serverValidationResults:{[key:string]:string} = {};
  public mockedServerValidationResultsOnServer:{[key:string]:string} = {};

  constructor() { }

  /**
   * Mock-olt asszinkron http kommunikáció
   */
  mockFormPostToServer(payload:any) : Observable<any> {

    return new Observable<any>( observer => {
      this.modelOnServer = JSON.parse(JSON.stringify(payload));
      this.serverValidationResults = JSON.parse(JSON.stringify(this.mockedServerValidationResultsOnServer));
      observer.next(JSON.parse(JSON.stringify(payload)))
    });
  }

  public serverValid(control: AbstractControl): ValidationErrors | null {
    let controlFullName:string = Util.getFormControlFullName(control);

    return controlFullName != null &&
      this.modelOnServer != null &&
      this.serverValidationResults != null &&
      this.serverValidationResults.hasOwnProperty(controlFullName) &&
      this.serverValidationResults[controlFullName] != null &&
      this.serverValidationResults[controlFullName].length > 0
      ?
      {'serverValid': {'text': this.serverValidationResults[controlFullName]}} : null;
  }

  public updateMockServerValidationKeys(form:AbstractControl) {
    let names: string[] = Util.getAllFormControlFullName(form);
    let updatedServerValidationResults: { [key: string]: string } = {};
    for(let name of names){
      if(this.mockedServerValidationResultsOnServer.hasOwnProperty(name)){
        updatedServerValidationResults[name] = this.mockedServerValidationResultsOnServer[name];
      }
      else{
        updatedServerValidationResults[name] = "";
      }
    }
    this.mockedServerValidationResultsOnServer = updatedServerValidationResults;
  }
}
