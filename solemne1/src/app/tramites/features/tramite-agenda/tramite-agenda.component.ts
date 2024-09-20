import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tramite-agenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tramite-agenda.component.html',
  styleUrl: './tramite-agenda.component.css'
})
export default class TramiteAgendaComponent {

  bloques: string[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'
  ];

  selectedSlots: { [key: string]: boolean[] } = {
    lunes: Array(this.bloques.length).fill(false),
    martes: Array(this.bloques.length).fill(false),
    miercoles: Array(this.bloques.length).fill(false),
    jueves: Array(this.bloques.length).fill(false),
    viernes: Array(this.bloques.length).fill(false),
    sabado: Array(this.bloques.length).fill(false),
  };

  selectSlot(day: string, index: number) {
    this.selectedSlots[day][index] = !this.selectedSlots[day][index];
  }
}
