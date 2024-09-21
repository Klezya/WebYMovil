import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',  // Esto asegura que el servicio sea singleton
})
export class SharedService {
  globalRun: string = ''
  globalTramite: string = 'primeraVez'

  setRun(run: string){
    this.globalRun = run
    localStorage.setItem('run',this.globalRun)
  }

  getRun():string | null{
    return this.globalRun || localStorage.getItem('run')
  }
  
}
