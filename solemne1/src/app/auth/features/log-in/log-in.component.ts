import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';
import { formatearRut, hasErrorRun, isRequired, runValidator } from '../../../utils/validator';
import { toast } from 'ngx-sonner';
import { FormLogIn } from '../../../utils/interfaces';
import { SharedService } from '../../../utils/shared.service';


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

  private _shared = inject(SharedService)

  isRequiredRun(){
    return isRequired('run',this.form)
  }

  hasErrorRun(){
    return hasErrorRun(this.form)
  }



  form = this._formBuilder.group<FormLogIn>({
    run: this._formBuilder.control('', [
      Validators.required,
      runValidator
    ]),
  });



  async submit(){
    if (this.form.invalid) return
      
    let temp = this.form.get('run')?.value
    if (!temp) return

    const run = formatearRut(temp)
    this._shared.setRun(run)

    try {
      if (!run) return
      await this._authService.logIn()
      toast.success('Rut registrado correctamente', {
        position: 'top-center'
      })
      this._router.navigateByUrl('/tramites')

    } catch (error) {
      console.log(error)
    }
  }
}
