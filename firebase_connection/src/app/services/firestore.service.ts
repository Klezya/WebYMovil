import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  addTestData() {
    const ref = collection(this.firestore, 'test-collection');
    return addDoc(ref, { name: 'Prueba', createdAt: new Date() });
  }
}
