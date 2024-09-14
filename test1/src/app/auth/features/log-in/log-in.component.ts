import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { hasEmailError, isRequired } from '../../utils/validators';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';

//Interfaz del formulario log-in
interface FormLogIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './log-in.component.html',
})


export default class LogInComponent {

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

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


  async submit(){
    if(this.form.invalid) return;
    
    const {email, password} = this.form.value;

    try {

      if (!email || !password) return;
      console.log({email, password})
      await this._authService.logIn({email, password})

      toast.success("Sesion iniciada correctamente")
      this._router.navigateByUrl('/tasks')

    } catch (error) {
      toast.error("Ocurrio un error")
      console.log(error)
    }
  }

}
