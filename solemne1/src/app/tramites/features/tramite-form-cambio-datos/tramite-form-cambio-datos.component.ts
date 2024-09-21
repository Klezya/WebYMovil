import { Component, inject, OnInit } from '@angular/core';
import { CitaLicencia, TramiteService } from '../../data-acces/tramite.service';
import { SharedService } from '../../../utils/shared.service';

@Component({
  selector: 'app-tramite-form-cambio-datos',
  standalone: true,
  imports: [],
  templateUrl: './tramite-form-cambio-datos.component.html',
  styleUrl: './tramite-form-cambio-datos.component.css'
})
export default class TramiteFormCambioDatosComponent implements OnInit{
  private _tramiteService = inject(TramiteService)
  private _shared = inject(SharedService)
  
  citas: CitaLicencia[] = []


  ngOnInit(): void {
    this._tramiteService.getCitaByRun(this._shared.globalRun).subscribe((data) => {
      this.citas = data
      console.log(this.citas)
    })
  }

}
