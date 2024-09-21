import { AbstractControl, Form, FormGroup, ValidationErrors } from "@angular/forms";
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

export const notAdult = (form: FormGroup) =>{
    const date = new Date(form.get('date')?.value)
    const today = new Date()
    const minAdultDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );
    return date && !(date <= minAdultDate) 
}

export const notRenovable = (form: FormGroup) => {
    const date = new Date(form.get('date')?.value)
    const today = new Date()

    return date && (date <= today)
}


//Validators del formControl
export const runValidator = (control: AbstractControl): ValidationErrors | null => {
    const run = control.value;
  
    if (!run || !validarRut(run)) {
      return { invalidRun: true };
    }
    return null;
};


export const datePrimeraVez = (control: AbstractControl): ValidationErrors | null =>{
    const date = new Date(control.value)
    const today = new Date()
    const minAdultDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
    
    if (!date || !(date <= minAdultDate)) {
        return { notAdult: true}
    }
    return null
}

export const dateRenovacion = (control: AbstractControl): ValidationErrors | null => {
    const date = new Date(control.value)
    const today = new Date()

    if (!date || !(date <= today)){
        return { notRenovable: true}
    }
    return null
}