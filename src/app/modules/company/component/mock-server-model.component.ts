import { Component } from '@angular/core';
import {BaseFormHttpService} from "../../../common/form/service/base-form-http.service";

@Component({
  selector: '[mock-server-model]',
  template: `
    <div class="example-viewer-wrapper-inner">
      <div class="example-viewer-title">Szerver oldali model:</div>
      <div class="example-viewer-body">
            <pre>
              {{ httpService.modelOnServer | json }}
            </pre>
      </div>
    </div>
  `
})
export class MockServerModelComponent {

  constructor(
    public httpService:BaseFormHttpService
  ) {
  }
}
