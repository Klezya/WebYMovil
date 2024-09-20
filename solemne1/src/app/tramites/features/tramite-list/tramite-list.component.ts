import { Component, inject} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tramite-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tramite-list.component.html',
  styleUrl: './tramite-list.component.css'
})
export default class TramiteListComponent {

  private _router = inject(Router)
  tipoTramite: string = 'primeraVez'

<<<<<<< Updated upstream
  submit() {
    switch (this.tipoTramite) {
      case 'primeraVez':
        this._router.navigateByUrl('tramites/form/primera-vez');   // verificar todas las rutas 
        break;
      case 'renovacion':
        this._router.navigateByUrl('tramites/form/renovacion');
        break;
      case 'cambioDatos':
        this._router.navigateByUrl('tramites/form/cambio-datos');
        break;
      default:
        // Manejar caso de tipo de trámite inválido
        console.error('Tipo de trámite inválido');
        break;
    }
=======
  submit(){
    
    switch (this.tipoTramite) {
      case 'primeraVez':
        this._router.navigateByUrl('tramites/nueva-licencia')
        break
      case 'renovacion':
        this._router.navigateByUrl('tramites/renovacion')
        break
      case 'cambioDatos':
        this._router.navigateByUrl('tramites/cambio-datos')
        break
      default:
        console.log(this.tipoTramite)
        break
    }

    
    return
>>>>>>> Stashed changes
  }

}