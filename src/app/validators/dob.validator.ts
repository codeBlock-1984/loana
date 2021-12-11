import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const REGEX = /^([0][1-9]|[1|2][0-9]|[3][0|1])[-]([0][1-9]|[1][0-2])[-]([0-9]{4})$/;

export function dobValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const val = control.value;
    const flag = REGEX.test(val);
    if (!flag) return { format: { value: val } };

    const age = Number(new Date().toISOString().split('T')[0].split('-')[0]) - val.split('-')[2];
    return !(age <= max && age >= min) ? { val: { value: val } } : null;
  };
}
