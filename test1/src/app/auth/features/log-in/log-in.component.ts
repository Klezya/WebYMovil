import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hasEmailError, isRequired } from '../../utils/validators';

//Interfaz del formulario log-in
interface FormLogIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
})


export default class LogInComponent {

  private _formBuilder = inject(FormBuilder);

  isRequired(field: 'email' | 'password'){
    return isRequired(field, this.form);
  }

  hasEmailError(){
    return hasEmailError(this.form)
  }


  //Crear logica del form
  form = this._formBuilder.group<FormLogIn>({

    email: this._formBuilder.control('', [
      Validators.required, //Validators (validaciones que podemos configurar)
      Validators.email, //Valida formato del email
    ]),
    password: this._formBuilder.control('', Validators.required),
  });


  submit(){
    if(this.form.invalid) return;
    
    const {email, password} = this.form.value;

    if (!email || !password) return;

    console.log({email, password})

  }

}
