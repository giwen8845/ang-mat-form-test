import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable()
export class CompanyFormHttpService {

  public modelOnServer:any = {};
  public serverValidationResult:any = null;

  constructor() { }

  /**
   * Mock-olt asszinkron http kommunikáció
   */
  mockFormPostToServer(payload:any){
    this.modelOnServer = JSON.parse(JSON.stringify(payload));
    this.mockServerValidationResponse();
  }

  mockServerValidationResponse(){
    this.serverValidationResult = {
      "name": "teszt3",
      "email": null,
      "date": null,
      "address": {
        "city": null,
        "street": "teszt4"
      },
      "attributes": [
        null
      ]
    }
  }

  public serverValid(control: AbstractControl): ValidationErrors | null {
    return this.serverValidationResult == null ?
      null : {'serverValid': {'text': "teszt2"}};
  }
}
