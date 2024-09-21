import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormPrimeraLicencia } from '../../../utils/interfaces';
import { datePrimeraVez, hasErrorRun, isRequired, notAdult, runValidator } from '../../../utils/validator';
import { CitaLicencia, TramiteService } from '../../data-acces/tramite.service';
import { SharedService } from '../../../utils/shared.service';
import { Router } from '@angular/router';

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
  private _shared = inject(SharedService)
  private _tramiteService = inject(TramiteService)
  private _router = inject(Router)

  loading = signal(false)


  form = this._formBuilder.group<FormPrimeraLicencia>({
    name: this._formBuilder.control('', Validators.required),
    run: this._formBuilder.control({value: this._shared.getRun(), disabled: true},[Validators.required, runValidator]),
    date: this._formBuilder.control(null, [Validators.required, datePrimeraVez])
  })
  
  isRequired(field: 'run' | 'name' | 'date'){
    return isRequired(field,this.form)
  }

  hasErrorRun(){
    return hasErrorRun(this.form)
  }

  notAdult(){
    return notAdult(this.form)
  }

  async submit(){
    if (this.form.invalid) {
      return this.form.getRawValue()
    }
    let {name, run, date} = this.form.getRawValue()

    if (!run || !name || !date) {
      console.log(this.form.getRawValue())
      return
    }

    try {
      this.loading.set(true)
      const cita: CitaLicencia = {
        run: run,
        name: name,
        fecha: date,
        tramite: this._shared.globalTramite
      } 
      
      await this._tramiteService.create(cita)
      this._router.navigateByUrl('tramites/reservar-hora')

    } catch (error) {
      console.log(error)
    } finally {
      this.loading.set(false)
    } 


    return
  }

}
