import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: '[mock-client-model]',
  template: `
    <div class="example-viewer-wrapper-inner">
      <div class="example-viewer-title">Kliens oldali model: {{ formRoot.status }}</div>
      <div class="example-viewer-body">
            <pre>
              {{ formRoot.value | json }}
            </pre>
      </div>
    </div>
  `
})
export class MockClientModelComponent {

  @Input()
  public formRoot:FormGroup = null;

  constructor() {
  }
}
