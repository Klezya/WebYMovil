import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../data-access/auth.service';
import { isRequired, hasEmailError } from '../../utils/validators';


interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html'
})
export default class SignUpComponent {

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
  form = this._formBuilder.group<FormSignUp>({

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
      await this._authService.signUp({email, password})

      toast.success("Usuario Creado")
      this._router.navigateByUrl('/tasks')
      
    } catch (error) {
      toast.error("Ocurrio un error")
      console.log(error)
    }
  }

}
