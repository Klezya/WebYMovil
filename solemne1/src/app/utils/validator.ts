import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";


export class RunValidator {


    
}

export const isRequiredRun = (form: FormGroup) => {
    const control = form.get('run');

    return control && control.touched && control.hasError('required');
}


//MALAA
export const validarRUT = (rut: any): any => {
  let sum = 0;
  let mul = 2;

  let i = rut.length;
  while (i--) {
    sum = sum + parseInt(rut.charAt(i)) * mul;
    if (mul % 7 === 0) {
      mul = 2;
    } else {
      mul++;
    }
  }

  const res = sum % 11;

  if (res === 0) {
    return '0';
  } else if (res === 1) {
    return 'k';
  }

  return `${11 - res}`;
};