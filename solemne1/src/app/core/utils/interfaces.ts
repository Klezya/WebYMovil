import { FormControl } from "@angular/forms";

//Primera interfaz tipo FormControl, para poder gestionar de mejor manera las verificaciones
//Este formulario es el formulario de la ruta 'auth/log-in'
export interface FormLogIn {
    run: FormControl<string | null>;
  }

//Segunda interfaz tipo FormControl
//Este formulario se encuentra en la ruta 'tramites/nueva-licencia' y 'tramites/renovacion'
export interface FormPrimeraLicencia {
    name: FormControl<string | null>;
    run: FormControl<string | null>;
    date: FormControl<Date | null>;  
}