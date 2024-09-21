import { Injectable } from '@angular/core';
import { CitaLicencia } from '../tramites/data-acces/tramite.service';

@Injectable({
  providedIn: 'root',  // Esto asegura que el servicio sea singleton
})
export class SharedService {
  globalRun: string = ''
  globalTramite: string = 'primeraVez'
  private _citaLicencia: CitaLicencia | null = null;

  setRun(run: string){
    this.globalRun = run
    localStorage.setItem('run',this.globalRun)
  }

  getRun():string{
    return this.globalRun || localStorage.getItem('run') || ''
  }

  setCitaLicencia(cita: CitaLicencia) {
    this._citaLicencia = cita;
  }

  getCitaLicencia(): CitaLicencia {
    return this._citaLicencia || {run:'',name:'', fecha:new Date(),tramite: '', agenda: ''};
  }
  
  
}
