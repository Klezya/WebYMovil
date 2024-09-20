import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendario', // Cambia 'app-calendario' por el selector que desees
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarioComponent implements OnInit {
  @Input() fechaInicio: Date = new Date(); // Inicializamos con la fecha actual
  @Output() fechaSeleccionada = new EventEmitter<Date>();

  fechasDisponibles: Date[] = [];

  ngOnInit() {
    // Generar las fechas disponibles a partir de la fecha inicial
    const hoy = new Date(this.fechaInicio);
    this.fechasDisponibles = Array.from({length: 30}, (_, i) => new Date(hoy.getTime() + i * 86400000));
  }

  seleccionarFecha(fecha: Date) {
    this.fechaSeleccionada.emit(fecha);
  }
}