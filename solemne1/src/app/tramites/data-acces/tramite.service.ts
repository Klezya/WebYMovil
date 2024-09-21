import { inject, Injectable } from "@angular/core"
import { addDoc, collection, Firestore, where, query, getDocs, deleteDoc, doc, DocumentSnapshot } from "@angular/fire/firestore"
import { from, map, Observable } from "rxjs"


//Se crea la interfaz que sera manejada por la base de datos
export interface CitaLicencia {
    run:string
    name:string
    fecha:Date
    tramite:string
    agenda:string
}

//Se define el PATH dentro de firebase, en este caso se guardaran en 'CitasLicencias/'
const PATH = 'CitasLicencias'

@Injectable({
    providedIn: 'root',    
})
export class TramiteService {
    private _firestore = inject(Firestore)
    private _collection = collection(this._firestore,PATH)


    //Funcion para crear un documento dentro de firebase y guardar la cita
    create(cita: CitaLicencia){
        return addDoc(this._collection, cita)
    }

    //Esta funcion se hizo para verificar si un RUT ya tenia una cita o no
    async existsByRun(run: string): Promise<boolean> {
        const q = query(this._collection, where('run', '==', run));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; 
    }// Retorna 'true' si hay documentos asociados al run, 'false' si no se encuentran
    
    // TO DO FOR DOCUMENTATION 
    // async deleteCitasByRun(run: string): Promise<void> {
    //     const q = query(this._collection, where('run', '==', run));
    //     const querySnapshot = await getDocs(q);
        
    //     const deletePromises = querySnapshot.docs.map(docSnap => {
    //         const docRef = doc(this._firestore, `${PATH}/${docSnap.id}`);
    //         return deleteDoc(docRef);
    //     });

    //     await Promise.all(deletePromises); // Espera a que todas las eliminaciones se completen
    // }

    //Funcion que busca todas las citas agendadas en la base de datos,se utiliza en 'tramites/reservar-hora'
    async getCitasByAgenda(): Promise<string[]> {
        const querySnapshot = await getDocs(this._collection);
        const citasTomadas: string[] = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data() as CitaLicencia;
            citasTomadas.push(data.agenda); 
        });
        return citasTomadas; 
    }// Retorna un arreglo con las agendas ocupadas (ej: '12:30/Jueves')
}