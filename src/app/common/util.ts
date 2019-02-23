import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors} from "@angular/forms";

export class Util {
  public static hasFormGroupClientValidationErrors(control:AbstractControl) {
    if(control != null){
      if(control.errors != null && Object.keys(control.errors).length > 0 &&
        (control.getError("serverValid") == null ||
          (control.getError("serverValid") != null && Object.keys(control.errors).length > 1)
        )
      ){
        return true;
      }
      if(control instanceof FormGroup) {
        if (control.controls != null) {
          for (var key in control.controls) {
            if (this.hasFormGroupClientValidationErrors(control.controls[key])) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  public static getFormControlName(c: AbstractControl): string | null {
    if(c != null && c.parent != null) {
      const formGroup = c.parent.controls;
      return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
    }
    return null;
  }

  public static getFormControlFullName(c: AbstractControl): string | null {
    if(c != null && c.parent != null) {
      let name:string = this.getFormControlName(c);
      let parentFullName:string = this.getFormControlFullName(c.parent);
      if(parentFullName != null){
        return parentFullName + "." + name;
      }
      return name;
    }
    return null;
  }

  public static getAllFormControlFullName(c: AbstractControl): string[] | null {
    let names:string[] = [];
    if(c != null) {
      if(c instanceof FormGroup || c instanceof FormArray) {
        if(c.controls != null){
          for (var key in c.controls) {
            names = [...names, ...this.getAllFormControlFullName(c.controls[key])];
          }
        }
      }
      else if(c.parent != null && c instanceof FormControl) {
        names.push(this.getFormControlFullName(c));
      }
    }
    return names;
  }
}
