import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PopupService } from './popup.service';
import { TramiteService } from '../../tramites/data-acces/tramite.service';
import { SharedService } from '../utils/shared.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-popup',
  template: `
    <div
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-1000"
      *ngIf="isVisible"
    >
      <div
        class="bg-gray-900 p-5 rounded-lg border border-gray-200 text-center max-w-md w-full"
      >
        <h1 class="text-xl font-bold text-white mb-2">{{ title }}</h1>
        <p class="text-base text-gray-300">{{ message }}</p>
        <button
          class="mr-2 bg-blue-600 text-white border-none py-2 px-5 rounded cursor-pointer hover:bg-blue-700"
          (click)="closePopup()"
        >
          Cerrar
        </button>
      </div>
    </div>
  `,
})

//Componente para mostrar informacion mas importante o mas precisa que solamente 'exito' o 'fracaso'
//Componente se utiliza mayormente en casos especiales donde ya se tenga una cita registrada y se necesite otro curso de accion del usuario
export default class PopUpComponent {
  private _tramiteService = inject(TramiteService);
  private _router = inject(Router);
  _shared = inject(SharedService);

  title: string = '';
  message: string = '';
  isVisible: boolean = false;

  constructor(private popupService: PopupService) {
    this.popupService.isVisible$.subscribe((visible) => {
      this.isVisible = visible;
    });

    this.popupService.popupData$.subscribe((data) => {
      if (data) {
        this.title = data.title;
        this.message = data.message;
      }
    });
  }

  closePopup() {
    this.popupService.closePopup();
  }

}
