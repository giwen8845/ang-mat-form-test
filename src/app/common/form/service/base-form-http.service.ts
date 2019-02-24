import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class BaseFormHttpService {

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
}
