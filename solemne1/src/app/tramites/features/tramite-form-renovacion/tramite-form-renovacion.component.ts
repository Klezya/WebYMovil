import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormPrimeraLicencia } from '../../../utils/interfaces';
import { datePrimeraVez, hasErrorRun, isRequired, notAdult, notExpired, runValidator } from '../../../utils/validator';
import { CitaLicencia, TramiteService } from '../../data-acces/tramite.service';
import { SharedService } from '../../../utils/shared.service';
import { Router } from '@angular/router';
import { PopupService } from '../../../core/ui/popup.service';
import PopUpComponent from "../../../core/ui/popup.component";


@Component({
  selector: 'app-tramite-form-renovacion',
  standalone: true,
  imports: [ReactiveFormsModule, PopUpComponent],
  templateUrl: './tramite-form-renovacion.component.html',
  styleUrl: './tramite-form-renovacion.component.css'
})
export default class TramiteFormRenovacionComponent {

  fechaSeleccionada = Date;

  private _formBuilder = inject(FormBuilder)
  private _shared = inject(SharedService)
  private _tramiteService = inject(TramiteService)
  private _router = inject(Router)
  private _popup = inject(PopupService)

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

  notExpired(){
    return notExpired(this.form)
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
      const cita: CitaLicencia = {
        run: run,
        name: name,
        fecha: date,
        tramite: this._shared.globalTramite,
        agenda: ''
      }
      
      const existe = await this.verificarDisponibilidad(run)
      if (!!existe) return
      console.log(cita)
      this._shared.setCitaLicencia(cita)
      this._router.navigateByUrl('tramites/reservar-hora')

    } catch (error) {
      console.log(error)
    } finally {
      this.loading.set(false)
    } 

    return
  }

  async verificarDisponibilidad(run:string){
    const existe = await this._tramiteService.existsByRun(run);

    if (existe) {
      this._popup.showPopup('Error','Ya tienes una cita agendada a tu RUN');
      return true
    }
    return false
  }
}
