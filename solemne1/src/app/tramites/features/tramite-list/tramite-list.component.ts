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

  submit(){
    
    this._router.navigateByUrl('tramites/form')
    return
  }

}