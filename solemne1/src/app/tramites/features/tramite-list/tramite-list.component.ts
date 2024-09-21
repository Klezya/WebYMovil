import { Component, inject} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../utils/shared.service';

@Component({
  selector: 'app-tramite-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tramite-list.component.html',
  styleUrl: './tramite-list.component.css'
})
export default class TramiteListComponent {

  private _router = inject(Router)
  _shared = inject(SharedService)

  submit(){
    
    switch (this._shared.globalTramite) {
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
        console.log(this._shared.globalTramite)
        break
    }

    
    return
  }

}