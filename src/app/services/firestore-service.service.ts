import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  // Agregar un evento a la colección "bbdditevent"
  agregarEvento(nombre: string, fecha: string) {
    const id = this.firestore.createId(); // Genera un ID único
    return this.firestore.collection('bbdditevent').doc(id).set({
      nombre: nombre,
      fecha: fecha
    });
  }

  // Obtener todos los eventos de la colección
  getEventos() {
    return this.firestore.collection('bbdditevent').valueChanges();
  }
}
