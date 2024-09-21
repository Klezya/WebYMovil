import { inject, Injectable } from "@angular/core"
import { addDoc, collection, Firestore, collectionData, where, query, getDocs, deleteDoc, doc } from "@angular/fire/firestore"
import { Observable } from "rxjs"



export interface CitaLicencia {
    run:string
    name:string
    fecha:Date
    tramite:string
}


export type CitaLicenciaCreate = Omit<CitaLicencia, 'id'>

const PATH = 'CitasLicencias'

@Injectable({
    providedIn: 'root',    
})
export class TramiteService {
    private _firestore = inject(Firestore)
    private _collection = collection(this._firestore,PATH)


    getCitaByRun(run: string): Observable<CitaLicencia[]>{
        const q = query(this._collection, where('run','==',run))
        return collectionData(q, {tramite: 'tramite'}) as Observable<CitaLicencia[]>
    }

    create(cita: CitaLicencia){
        return addDoc(this._collection, cita)
    }

    async existsByRun(run: string): Promise<boolean> {
        const q = query(this._collection, where('run', '==', run));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; // Retorna true si hay documentos, false si no
    }
    
    async deleteCitasByRun(run: string): Promise<void> {
        const q = query(this._collection, where('run', '==', run));
        const querySnapshot = await getDocs(q);
        
        const deletePromises = querySnapshot.docs.map(docSnap => {
            const docRef = doc(this._firestore, `${PATH}/${docSnap.id}`);
            return deleteDoc(docRef);
        });

        await Promise.all(deletePromises); // Espera a que todas las eliminaciones se completen
    }
}