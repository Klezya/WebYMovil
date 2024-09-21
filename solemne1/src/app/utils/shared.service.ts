import { Injectable } from '@angular/core';
import { CitaLicencia } from '../tramites/data-acces/tramite.service';

@Injectable({
  providedIn: 'root',  // Esto asegura que el servicio sea singleton
})


//SHARED SERVICE sirve para compartir y mantener informacion a travez de los componentes, como por ejemplo el tipo de tramite y el run,
//ademas del formulario CitaLicencia
export class SharedService {
  globalRun: string = ''
  globalTramite: string = 'primeraVez'
  private _citaLicencia: CitaLicencia | null = null;

  setRun(run: string){
    this.globalRun = run
    localStorage.setItem('run',this.globalRun)
  }//Funcion que setea el rut compartido

  getRun():string{
    return this.globalRun || localStorage.getItem('run') || ''
  }//Funcion que retorna el rut compartido

  setCitaLicencia(cita: CitaLicencia) {
    this._citaLicencia = cita;
  }//Funcion que setea la cita compartida

  getCitaLicencia(): CitaLicencia {
    return this._citaLicencia || {run:'',name:'', fecha:new Date(),tramite: '', agenda: ''};
  }//Funcion que retorna la cita compartida
  
}
