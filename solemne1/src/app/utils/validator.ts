import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { formatRut, validateRut } from "@fdograph/rut-utilities";


export const validarRut = (rut: string) => {
    return validateRut(rut)
}

export const formatearRut = (rut: string) =>{
    return formatRut(rut)
}//Formato 11222333-4


export const isRequired = (field: 'name' | 'run' | 'date', form: FormGroup) => {
    const control = form.get(field);
  
    return control && control.touched && control.hasError('required');
};

export const hasErrorRun = (form: FormGroup) => {
    const control = form.get('run')
    return control && !validarRut(control.value) 
}

//Validators del formControl
export const runValidator = (control: AbstractControl): ValidationErrors | null => {
    const run = control.value;
  
    if (!run || !validarRut(run)) {
      return { invalidRun: true };
    }
    return null;
  };
  