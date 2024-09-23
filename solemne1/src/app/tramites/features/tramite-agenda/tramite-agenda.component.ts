import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '../../../core/ui/popup.service';
import { CitaLicencia, TramiteService } from '../../data-acces/tramite.service';
import { SharedService } from '../../../core/utils/shared.service';
import { toast } from 'ngx-sonner';
import PopUpComponent from "../../../core/ui/popup.component";

@Component({
  selector: 'app-tramite-agenda',
  standalone: true,
  imports: [CommonModule, PopUpComponent],
  templateUrl: './tramite-agenda.component.html'
})
export default class TramiteAgendaComponent implements OnInit {
  private _popup = inject(PopupService);
  private _shared = inject(SharedService);
  private _tramiteService = inject(TramiteService);
  private _router = inject(Router);
  loading = signal(false)

  //Se crea una cita vacia como plantilla y variables para manejar la agenda de citas
  cita: CitaLicencia = { run: '', name: '', fecha: new Date(), tramite: '', agenda: '' }
  selectedBlock: string = ''
  disabledBlocks: string[] = []
  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  blocks: string[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'
  ]

  //Carga los bloques ya reservados y trae la cita desde el servicio compartido (SHARED)
  ngOnInit(): void {
    this.cita = this._shared.getCitaLicencia()
    this.loadDisabledBlocks()
    this.selectedBlock = this.cita.agenda
  }

  // Cargar los bloques ya reservados desde Firebase
  async loadDisabledBlocks() {
    this.loading.set(true)
    try {
      this.disabledBlocks = await this._tramiteService.getCitasByAgenda();
    } catch (error) {
      console.error('Error cargando las citas:', error);
    } finally {
      this.loading.set(false)
    }
  }

  // Método para seleccionar un bloque
  selectBlock(block: string) {
    if (!this.isDisabled(block)) {
      this.selectedBlock = this.selectedBlock === block ? '' : block;
    }
  }

  // Método para saber si un bloque está seleccionado
  isSelected(block: string): boolean {
    return this.selectedBlock === block;
  }

  // Método para saber si un bloque está reservado
  isDisabled(block: string): boolean {
    if(block === this._shared.getCitaLicencia().agenda) {
      return false
    }
    return this.disabledBlocks.includes(block);
  }

  //Metodo para comprobar que la cita no tenga valores nulos
  citaNotNull(): boolean {
    return !(this.cita.agenda === '' || this.cita.name === '' || this.cita.run === '' || this.cita.tramite === '' || this.cita.fecha === null);
  }
  
  async submit() {
    this.loading.set(true)
    try {
      //Se comprueba que el bloque realmente este disponible
      if (this.isDisabled(this.selectedBlock)) {
        this.selectedBlock = ''; // Resetea la selección si está deshabilitada
        this._popup.showPopup('Error', 'El horario seleccionado ya está ocupado. Por favor, seleccione otro.');
        return;
      }

      //Si el bloque seleccionado no es nulo se verifica y agrega la cita a la base de datos
      if (this.selectedBlock != '') {
        this.cita.agenda = this.selectedBlock;
        //Bloque por si se viene por renovacion
        if (this._shared.getTramite() === 'cambioDatos' && this.citaNotNull()){
          await this._tramiteService.updateCita(this.cita)
          this._router.navigateByUrl('tramites');
          toast.success('Cita actualizada correctamente', {
            position: 'top-center'
          });
        } else if (this.citaNotNull()) { //Bloque por si se viene por primera licencia o renovacion
          await this._tramiteService.create(this.cita);
          this._router.navigateByUrl('tramites');
          toast.success('Cita agendada correctamente', {
            position: 'top-center'
          });
        } else {
          toast.error('Formulario invalido, intentelo nuevamente', {
            position: 'top-center'
          })
          this._router.navigateByUrl('tramites')
        }
      } else {
        this._popup.showPopup('Error', 'Seleccione una hora');
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading.set(false)
    }
  }
}

