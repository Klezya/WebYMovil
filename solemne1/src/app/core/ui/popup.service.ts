import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


//Servicio del popup, para poder llamarlo deesde cualquier componente
export class PopupService {
  private popupDataSubject = new BehaviorSubject<{ title: string; message: string } | null>(null)
  private isVisibleSubject = new BehaviorSubject<boolean>(false)
  
  isVisible$ = this.isVisibleSubject.asObservable()
  popupData$ = this.popupDataSubject.asObservable()

  showPopup(title: string, message: string) {
    this.popupDataSubject.next({ title, message })
    this.isVisibleSubject.next(true);
  }

  closePopup() {
    this.isVisibleSubject.next(false)
    this.popupDataSubject.next(null)
  }
}
