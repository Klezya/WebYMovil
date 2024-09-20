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

  selectedBlock: string | null = null;

  // Datos de la tabla de horarios
  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  blocks: string[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'
  ];

  // Método para seleccionar un bloque
  selectBlock(block: string) {
    // Si el bloque ya está seleccionado, lo deselecciona
    this.selectedBlock = this.selectedBlock === block ? null : block;
  }

  // Método para saber si un bloque está seleccionado
  isSelected(block: string): boolean {
    return this.selectedBlock === block;
  }
}
