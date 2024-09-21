import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-popup',
  styleUrl: 'popup.component.css',
  template: `
    <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-1000" *ngIf="isVisible">
      <div class="bg-gray-900 p-5 rounded-lg border border-gray-200 text-center max-w-md w-full">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <button class="bg-blue-600 text-white border-none py-2 px-5 rounded cursor-pointer hover:bg-blue-700" (click)="closePopup()">Cerrar</button>
      </div>
    </div>
  `,
})

export default class PopUpComponent {
  title: string = 'titulo';
  message: string = 'mensaje';  
  isVisible: boolean = false;

  showPopup() {
    this.isVisible = true;
  }

  closePopup() {
    this.isVisible = false;
  }
}
