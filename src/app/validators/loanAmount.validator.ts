import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function loanAmountValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const val = control.value;
    return !(val <= max && val >= min) ? { val: { value: val } } : null;
  };
}
