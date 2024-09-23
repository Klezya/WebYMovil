import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormPrimeraLicencia } from '../../../core/utils/interfaces';
import { datePrimeraVez, dateRenovacion, hasErrorRun, isRequired, notAdult, notExpired, runValidator } from '../../../core/utils/validator';
import { CitaLicencia, TramiteService } from '../../data-acces/tramite.service';
import { SharedService } from '../../../core/utils/shared.service';
import { Router } from '@angular/router';
import { PopupService } from '../../../core/ui/popup.service';
import PopUpComponent from "../../../core/ui/popup.component";
import { CommonModule } from '@angular/common';
import { toast } from 'ngx-sonner';


@Component({
  selector: 'app-tramite-form-cambio-datos',
  standalone: true,
  imports: [ReactiveFormsModule, PopUpComponent, CommonModule],
  templateUrl: './tramite-form-cambio-datos.component.html'
})
export default class TramiteFormCambioDatosComponent implements OnInit{
  private _formBuilder = inject(FormBuilder)
  private _shared = inject(SharedService)
  private _tramiteService = inject(TramiteService)
  private _router = inject(Router)
  private _popup = inject(PopupService)
  loading = signal(false)

  cita: CitaLicencia = { run: '', name: '', fecha: new Date(), tramite: '', agenda: '' }

  form = this._formBuilder.group<FormPrimeraLicencia>({
    name: this._formBuilder.control('', Validators.required),
    run: this._formBuilder.control({value: this._shared.getRun(), disabled: true},[Validators.required, runValidator]),
    date: this._formBuilder.control(null, [Validators.required, this.cita.tramite === 'primeraVez'? datePrimeraVez : dateRenovacion])
  })


  async ngOnInit(): Promise<void> {
    this.loading.set(true)
    const run = this._shared.getRun()
    this.cita = await this._tramiteService.getCitaByRun(run)
    if (this.cita.tramite === 'primeraVez' || this.cita.tramite ==='renovacion') {
      this.form.patchValue({
        name: this.cita.name,
        date: this.cita.fecha
      })
    } else {
      this._popup.showPopup('Error', 'No se encontró una cita para el RUN proporcionado.');
      this._router.navigateByUrl('tramites')
    }
    this.loading.set(false)
  }

  
  isRequired(field: 'run' | 'name' | 'date'){
    return isRequired(field,this.form)
  }
  hasErrorRun(){
    return hasErrorRun(this.form)
  }
  notAdult(){
    return notAdult(this.form)
  }
  notExpired(){
    return notExpired(this.form)
  }

  async submit(){
    if (this.form.invalid) return

    let {name, run, date} = this.form.getRawValue()
    if (!run || !name || !date) return

    this.loading.set(true)
    try {
      const cita: CitaLicencia = {
        run: this._shared.getRun(),
        name: name,
        fecha: date,
        tramite: this.cita.tramite,
        agenda: this.cita.agenda
      }
      
      const existe = await this.verificarDisponibilidad(run)
      if (!existe) {
        this._router.navigateByUrl('tramites')
        return 
      }
      this._shared.setCitaLicencia(cita)
      this._shared.setTramite('cambioDatos')
      this._router.navigateByUrl('tramites/reservar-hora')
    } catch (error) {
      console.log(error)
    } finally {
      this.loading.set(false)
    } 
    return
  }

  async deleteCita() {
    try {
      await this._tramiteService.deleteCitasByRun(this._shared.getRun());
      toast.success('Se ha eliminado la cita correctamente', {
        position: 'top-center'
      })
      this._router.navigateByUrl('tramites')
    } catch (error) {
      console.error('Error al eliminar citas:', error);
    }
  }

  async verificarDisponibilidad(run:string){
    const existe = await this._tramiteService.existsByRun(run);
    if (existe) {
      return true
    }
    this._popup.showPopup('ERROR GARRAFAL','Alguien ha borrado tu informacion de la base de datos 🤯')
    return false
  }
}