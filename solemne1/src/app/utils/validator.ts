import { AbstractControl, Form, FormGroup, ValidationErrors } from "@angular/forms";
import { formatRut, validateRut } from "@fdograph/rut-utilities";


//Funciones para validar parametros en los FORMs de el componente.HTML
export const validarRut = (rut: string) => {
    return validateRut(rut)
}//Retorna 'true' si es valido 'false' si no

export const formatearRut = (rut: string) =>{
    return formatRut(rut)
}//Formato 11222333-4

export const isRequired = (field: 'name' | 'run' | 'date', form: FormGroup) => {
    const control = form.get(field);
    return control && control.touched && control.hasError('required');
}//Funcion utilizada en HTML, retorna 'true' si el input 1:no es nulo, 2:ha sido tocado por el usuario(click), 3:el campo no ha sido rellenado

export const hasErrorRun = (form: FormGroup) => {
    const control = form.get('run')
    return control && !validarRut(control.value) 
}//Funcion utilizada en HTML, retorna 'true' si el input 1:no es nulo, 2:el rut dentro del input es valido 

export const notAdult = (form: FormGroup) =>{
    const date = new Date(form.get('date')?.value)
    const today = new Date()
    const minAdultDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );
    return date && !(date <= minAdultDate) 
}//Funcion utilizada en HTML, retorna 'true' si el input 1:no es nulo, 2:la fecha ingresada es anterior a la fecha necesaria para ser mayor de edad actualmente

export const notExpired = (form: FormGroup) => {
    const date = new Date(form.get('date')?.value);
    const today = new Date(); 
    
    return date && date < today ? null : { expired: true };
}//Funcion utilizada en HTML, retorna 'true' si el input 1:no es nulo, 2:la fecha ingresada es anterior a la fecha de hoy


//Validators para utilizarlos en el FormControl
export const runValidator = (control: AbstractControl): ValidationErrors | null => {
    const run = control.value;
  
    if (!run || !validarRut(run)) {
      return { invalidRun: true };
    }
    return null;
};//Valida el rut en el formulario

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
}//Valida si la fecha de nacimiento en el formulario de primera licencia corresponde a un mayor de edad

export const dateRenovacion = (control: AbstractControl): ValidationErrors | null => {
    const date = new Date(control.value)
    const today = new Date()

    if (!date || !(date <= today)){
        return { notRenovable: true}
    }
    return null
}//Valida si la fecha de vencimiento en el formulario de renovacion esta expirada o no