import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormPrimeraLicencia } from '../../../utils/interfaces';
import { datePrimeraVez, hasErrorRun, isRequired, notAdult, runValidator } from '../../../utils/validator';
import { CitaLicencia, TramiteService } from '../../data-acces/tramite.service';
import { SharedService } from '../../../utils/shared.service';
import { Router } from '@angular/router';
import { PopupService } from '../../../core/ui/popup.service';
import PopUpComponent from "../../../core/ui/popup.component";

@Component({
  selector: 'app-tramite-form',
  standalone: true,
  imports: [ReactiveFormsModule, PopUpComponent],
  templateUrl: './tramite-form.component.html'
})
export default class TramiteFormPrimeraVezComponent {

  //Se traen todas las clases necesarias
  private _formBuilder = inject(FormBuilder)
  private _shared = inject(SharedService)
  private _tramiteService = inject(TramiteService)
  private _router = inject(Router)
  private _popup = inject(PopupService)
  loading = signal(false)

  //Se crea el formulario como FormControl y se autocompleta el RUN, ya que fue ingresado anteriormente al iniciar sesion
  form = this._formBuilder.group<FormPrimeraLicencia>({
    name: this._formBuilder.control('', Validators.required),
    run: this._formBuilder.control({value: this._shared.getRun(), disabled: true},[Validators.required, runValidator]),
    date: this._formBuilder.control(null, [Validators.required, datePrimeraVez])
  })
  
  //Validaciones en los inputs del HTML, explicadas en 'utils/validatos.ts'
  isRequired(field: 'run' | 'name' | 'date'){
    return isRequired(field,this.form)
  }
  hasErrorRun(){
    return hasErrorRun(this.form)
  }
  notAdult(){
    return notAdult(this.form)
  }

  //Funcion submit de la ruta 'tramites/nueva-licencia'
  async submit(){
    //Comprueba si las validaciones del FormControl
    if (this.form.invalid) {
      return this.form.getRawValue()
    }
    //Se verifica que los valores del form no sean nulos
    let {name, run, date} = this.form.getRawValue()
    if (!run || !name || !date) return

    this.loading.set(true)
    try {
      //Se crea un objeto cita
      const cita: CitaLicencia = {
        run: this._shared.getRun(),
        name: name,
        fecha: date,
        tramite: this._shared.getTramite(),
        agenda: ''
      }
      //Se verifica si el RUN ya tiene una cita registrada
      const existe = await this.verificarDisponibilidad(run)
      if (!!existe) return
      this._shared.setCitaLicencia(cita)
      this._router.navigateByUrl('tramites/reservar-hora')

    } catch (error) {
      console.log(error)
    } finally {
      this.loading.set(false)
    }
    return
  }

  //Funcion que llama a los servicios de tramite para retornar 'true' si el rut tiene una cita y 'false' si no
  async verificarDisponibilidad(run:string){
    const existe = await this._tramiteService.existsByRun(run);
    if (existe) {
      //Pop up con informacion mas detallada del caso y pasos a seguir
      this._popup.showPopup('Error','Ya tienes una cita agendada a tu RUN, porfavor selecciona el tramite "Cambio de Datos de Cita"');
      this._router.navigateByUrl('tramites')
      return true
    }
    return false
  }
}
