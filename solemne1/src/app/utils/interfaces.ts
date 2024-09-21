import { FormControl } from "@angular/forms";


export interface FormLogIn {
    run: FormControl<string | null>;
  }

export interface FormPrimeraLicencia {
    name: FormControl<string | null>;
    run: FormControl<string | null>;
    date: FormControl<Date | null>;  
}