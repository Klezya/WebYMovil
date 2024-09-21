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
  templateUrl: './log-in.component.html'
})


export default class LogInComponent {
  //Variables para trabajar con formularios reactivos y FormControl, ademas del servicio de autenticacion y variables compartidas (_shared)
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _shared = inject(SharedService)

  //Validadores para el input del form en el HTML
  //Funciones explicadas en '../utils/validators.ts'
  isRequiredRun(){
    return isRequired('run',this.form)
  }
  hasErrorRun(){
    return hasErrorRun(this.form)
  }

  //Estructura del formulario de 'log-in'
  form = this._formBuilder.group<FormLogIn>({
    run: this._formBuilder.control('', [
      Validators.required,
      runValidator
    ]),
  });

  //Funcion asincrona del boton Submit, porque conlleva la comunicacion con firebase al autenticas el usuario y guardar el rut en el servicio SHARED
  async submit(){
    //Verifica las validaciones del formControl
    if (this.form.invalid) return

    //Verifica que rut no sea nulo, lo guarda en una variable temporal y luego lo setea en compartidos para usarlo en otros formularios
    const temp = this.form.get('run')?.value
    if (!temp) return
    const run = formatearRut(temp)
    this._shared.setRun(run)

    //Intenta logearse anonimamente guardando el rut y ejecuta una notificacion si sale bien (toast.succes)
    try {
      if (!run) return
      await this._authService.logIn()
      toast.success('Rut registrado correctamente', {
        position: 'top-center'
      })
      this._router.navigateByUrl('/tramites')

    } catch (error) {
      toast.error('Algo salio mal, intentelo denuevo mas tarde', {
        position: 'top-center'
      })
      //console.log(error)
    }
  }
}
