import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '../../../core/ui/popup.service';
import { CitaLicencia, TramiteService } from '../../data-acces/tramite.service';
import { SharedService } from '../../../utils/shared.service';
import { toast } from 'ngx-sonner';
import PopUpComponent from "../../../core/ui/popup.component";

@Component({
  selector: 'app-tramite-agenda',
  standalone: true,
  imports: [CommonModule, PopUpComponent],
  templateUrl: './tramite-agenda.component.html',
  styleUrls: ['./tramite-agenda.component.css']
})
export default class TramiteAgendaComponent implements OnInit {
  private _popup = inject(PopupService);
  private _shared = inject(SharedService);
  private _tramiteService = inject(TramiteService);
  private _router = inject(Router);

  cita: CitaLicencia = { run: '', name: '', fecha: new Date(), tramite: '', agenda: '' };
  selectedBlock: string = '';
  disabledBlocks: string[] = []; // Bloques de horario ya reservados

  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  blocks: string[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'
  ];

  constructor() {
    this.cita = this._shared.getCitaLicencia();
  }

  ngOnInit(): void {
    this.loadDisabledBlocks();
  }

  // Cargar los bloques ya reservados desde Firebase
  async loadDisabledBlocks() {
    try {
      this.disabledBlocks = await this._tramiteService.getCitasByAgenda();
    } catch (error) {
      console.error('Error cargando las citas:', error);
    }
  }

  // Método para seleccionar un bloque
  selectBlock(block: string) {
    if (!this.isDisabled(block)) {
      this.selectedBlock = this.selectedBlock === block ? '' : block;
      console.log(this.selectedBlock)
    }
  }

  // Método para saber si un bloque está seleccionado
  isSelected(block: string): boolean {
    return this.selectedBlock === block;
  }

  // Método para saber si un bloque está deshabilitado (ya tomado)
  isDisabled(block: string): boolean {
    return this.disabledBlocks.includes(block);
  }

  citaNotNull(): boolean {
    return !(this.cita.agenda === '' || this.cita.name === '' || this.cita.run === '' || this.cita.tramite === '' || this.cita.fecha === null);
  }
  

  async submit() {
    try {
      //console.log(this.selectedBlock)
      //console.log(this.disabledBlocks)
      if (this.isDisabled(this.selectedBlock)) {
        this.selectedBlock = ''; // Resetea la selección si está deshabilitada
        this._popup.showPopup('Error', 'El horario seleccionado ya está ocupado. Por favor, seleccione otro.');
        return;
      }

      if (this.selectedBlock != '') {
        this.cita.agenda = this.selectedBlock;
        
        if (this.citaNotNull()) {
          await this._tramiteService.create(this.cita);
          this._router.navigateByUrl('tramites');
          toast.success('Cita agendada correctamente', {
            position: 'top-center'
          });
        } else {
          toast.error('Formulario invalido, intentelo nuevamente', {
            position: 'top-center'
          })
          console.log(this.cita)
          this._router.navigateByUrl('tramites')
        }
      } else {
        this._popup.showPopup('Error', 'Seleccione una hora');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

