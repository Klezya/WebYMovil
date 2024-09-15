import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';
import { isRequiredRun, validarRUT } from '../../../utils/validator';
import { toast } from 'ngx-sonner';

interface FormLogIn {
  run: FormControl<string | null>;
}

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export default class LogInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequiredRun(){
    return isRequiredRun(this.form)
  }

  form = this._formBuilder.group<FormLogIn>({
    run: this._formBuilder.control('', [
      Validators.required
      //Validators.pattern('^d{1,8}-[kK0-9]{1}$'),
    ]),
  });


  async submit(){
    if (this.form.invalid) return
      
    const run = this.form.value
    console.log(run)
    console.log(validarRUT(run))
    try {
      if (!run) return

      await this._authService.logIn()
      toast.success('Iniciado Correctamente')
      //this._router.navigateByUrl('/tramites')

    } catch (error) {
      console.log(error)
    }
  }
}
