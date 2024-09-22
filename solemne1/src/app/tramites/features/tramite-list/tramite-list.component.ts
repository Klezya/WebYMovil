import { Component, inject} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../utils/shared.service';
import PopUpComponent from "../../../core/ui/popup.component";

@Component({
  selector: 'app-tramite-list',
  standalone: true,
  imports: [FormsModule, PopUpComponent],
  templateUrl: './tramite-list.component.html'
})
export default class TramiteListComponent {

  private _router = inject(Router)
  private _shared = inject(SharedService)
  tipoTramite = this._shared.getTramite()

  //Funcion submit, dependiendo el tramite elegido se redirecciona
  submit(){
    this._shared.setTramite(this.tipoTramite)
    switch (this._shared.getTramite()) {
      case 'primeraVez':
        this._router.navigateByUrl('tramites/nueva-licencia')
        break
      case 'renovacion':
        this._router.navigateByUrl('tramites/renovacion')
        break
      case 'cambioDatos':
        this._router.navigateByUrl('tramites/modificar-cita')
        break
      default:
        console.log(this._shared.getTramite())
        break
    }
    return
  }

}