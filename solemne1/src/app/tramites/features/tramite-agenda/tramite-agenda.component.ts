import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import PopUpComponent from '../../../core/ui/popup.component';
import { PopupService } from '../../../core/ui/popup.service';
import { CitaLicencia, TramiteService } from '../../data-acces/tramite.service';
import { SharedService } from '../../../utils/shared.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-tramite-agenda',
  standalone: true,
  imports: [CommonModule, PopUpComponent],
  templateUrl: './tramite-agenda.component.html',
  styleUrl: './tramite-agenda.component.css'
})
export default class TramiteAgendaComponent {
  private _popup = inject(PopupService)
  private _shared = inject(SharedService)
  private _tramiteService = inject(TramiteService);
  private _router = inject(Router)

  cita: CitaLicencia = {run:'',name:'', fecha:new Date(),tramite: '', agenda: ''}

  constructor(){
    this.cita = this._shared.getCitaLicencia()
  }

  selectedBlock: string = '';

  // Datos de la tabla de horarios
  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  blocks: string[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'
  ];

  // Método para seleccionar un bloque
  selectBlock(block: string) {
    // Si el bloque ya está seleccionado, lo deselecciona
    this.selectedBlock = this.selectedBlock === block ? '' : block;
  }

  // Método para saber si un bloque está seleccionado
  isSelected(block: string): boolean {
    return this.selectedBlock === block;
  }

  async submit(){
    try {
      if (this.selectedBlock != '') {
        this.cita.agenda = this.selectedBlock
        await this._tramiteService.create(this.cita)
        console.log(this.cita)
        this._router.navigateByUrl('tramites')
        toast.success('Cita agendada correctamente', {
          position: 'top-center'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
