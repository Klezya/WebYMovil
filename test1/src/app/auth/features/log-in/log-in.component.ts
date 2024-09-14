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
  private _authService = inject(AuthService)


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

      toast.success("Usuario Creado")

    } catch (error) {
      toast.error("Ocurrio un error")
      console.log(error)
    }
  }

}
