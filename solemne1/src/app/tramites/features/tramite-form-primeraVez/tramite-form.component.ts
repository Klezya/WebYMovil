import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormPrimeraVez } from '../../../utils/interfaces';
import { globalRun } from '../../../auth/features/log-in/log-in.component'
import { hasErrorRun, isRequiredRun, runValidator } from '../../../utils/validator';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tramite-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tramite-form.component.html',
  styleUrl: './tramite-form.component.css'
})
export default class TramiteFormPrimeraVezComponent {

  fechaSeleccionada = Date;

  private _formBuilder = inject(FormBuilder)
  private run = globalRun

  form = this._formBuilder.group<FormPrimeraVez>({
    name: this._formBuilder.control('', Validators.required),
    run: this._formBuilder.control(this.run, [Validators.required, runValidator]),
    date: this._formBuilder.control(null, Validators.required)
  })
  
  isRequiredRun(){
    return isRequiredRun(this.form)
  }

  hasErrorRun(){
    return hasErrorRun(this.form)
  }

  submit(){

    console.log(this.form.value)
    return
  }

}
