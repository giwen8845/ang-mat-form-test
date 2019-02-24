import {FormUtil} from "../form-util";
import {BaseFormHttpService} from "../service/base-form-http.service";
import {BaseFormValidatorService} from "../service/base-form-validator.service";
import {FormGroup} from "@angular/forms";

export abstract class BaseFormComponent {

  public formRoot:FormGroup = null;

  constructor(
    public httpService:BaseFormHttpService,
    public validatorService:BaseFormValidatorService
  ) { }

  onSubmit() {
    /**
     * Elküld: form adatok
     * Válasz: form adatok + validáció
     * TODO más is érkezhet, globális üzenetek, stb, illetve csak mockolt, hogy melyik adat hol lakik, validáció egyelőre a serviceben
     */
    this.httpService.mockFormPostToServer(this.formRoot.value)
      .subscribe(value => {
        this.formRoot.setValue(value)
      });
  }

  hasAnyClientValidationErrors() : boolean {
    return FormUtil.hasFormGroupClientValidationErrors(this.formRoot);
  }

  ngOnInit() {
    this.validatorService.updateMockServerValidationKeys(this.formRoot);
    this.formRoot.valueChanges.subscribe(form => {
      this.validatorService.updateMockServerValidationKeys(this.formRoot);
    });
  }
}
