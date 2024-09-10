import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private firestore: Firestore) {}

  // Obtener tareas desde Firebase
  getTareas(): Observable<any[]> {
    const tareasRef = collection(this.firestore, 'tareas');
    return collectionData(tareasRef, { idField: 'id' });
  }

  // Agregar nueva tarea
  addTarea(tarea: any) {
    const tareasRef = collection(this.firestore, 'tareas');
    return addDoc(tareasRef, tarea);
  }

  // Eliminar tarea
  deleteTarea(id: string) {
    const tareaDocRef = doc(this.firestore, `tareas/${id}`);
    return deleteDoc(tareaDocRef);
  }
}
