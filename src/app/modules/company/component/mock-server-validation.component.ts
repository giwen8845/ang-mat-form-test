import { Component } from '@angular/core';
import {BaseFormHttpService} from "../../../common/form/service/base-form-http.service";

@Component({
  selector: '[mock-server-validation]',
  template: `
    <div class="example-viewer-wrapper-inner">
      <div class="example-viewer-title">Szerver oldali validáció response:</div>
      <div class="example-viewer-body">
        <div class="server-validation-wrapper">
          <ng-container *ngFor="let key of objectKeys(httpService.mockedServerValidationResultsOnServer)" >
            <div class="server-validation-key">{{key}}:</div>
            <div class="server-validation-value"><input type="text" [(ngModel)]="httpService.mockedServerValidationResultsOnServer[key]"></div>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class MockServerValidationComponent {

  objectKeys = Object.keys;

  constructor(
    public httpService:BaseFormHttpService
  ) {
  }
}
