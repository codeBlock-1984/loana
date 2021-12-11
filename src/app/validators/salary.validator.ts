import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function salaryValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const val = control.value;
    return !(val >= min) ? { val: { value: val } } : null;
  };
}
