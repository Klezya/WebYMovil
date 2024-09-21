import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PopupService } from './popup.service';
import { TramiteService } from '../../tramites/data-acces/tramite.service';
import { SharedService } from '../../utils/shared.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-popup',
  template: `
    <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-1000" *ngIf="isVisible">
      <div class="bg-gray-900 p-5 rounded-lg border border-gray-200 text-center max-w-md w-full">
        <h1 class="text-xl font-bold text-white mb-2">{{ title }}</h1>
        <p class="text-base text-gray-300" >{{ message }}</p>
        <button class="mr-2 bg-blue-600 text-white border-none py-2 px-5 rounded cursor-pointer hover:bg-blue-700" (click)="closePopup()">Cerrar</button>
        <button class="mx-2 bg-red-600 text-white border-none py-2 px-5 rounded cursor-pointer hover:bg-red-700" (click)="deleteCita(this._shared.getRun())">Eliminar Cita</button>
      </div>
    </div>
  `,
})
export default class PopUpComponent {
  private _tramiteService = inject(TramiteService)
  _shared = inject(SharedService)

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

  async deleteCita(run: string) {
    try {
        await this._tramiteService.deleteCitasByRun(run);
        this.closePopup()
    } catch (error) {
        console.error('Error al eliminar citas:', error);
    }
  }


}
