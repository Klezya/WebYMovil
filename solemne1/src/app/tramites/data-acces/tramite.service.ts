import { inject, Injectable } from "@angular/core"
import { addDoc, collection, Firestore, where, query, getDocs, deleteDoc, doc, DocumentSnapshot } from "@angular/fire/firestore"
import { from, map, Observable } from "rxjs"



export interface CitaLicencia {
    run:string
    name:string
    fecha:Date
    tramite:string
    agenda:string
}


export type CitaLicenciaCreate = Omit<CitaLicencia, 'agenda'>

const PATH = 'CitasLicencias'

@Injectable({
    providedIn: 'root',    
})
export class TramiteService {
    private _firestore = inject(Firestore)
    private _collection = collection(this._firestore,PATH)


    getCitaByRun(run: string): Observable<CitaLicencia | null> {
        const q = query(this._collection, where('run', '==', run));

        return from(getDocs(q)).pipe(
            map((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const docSnap = querySnapshot.docs[0];
                    return docSnap.data() as CitaLicencia; // Retorna la primera cita encontrada
                }
                return null; // Retorna null si no se encuentra ninguna cita
            })
        );
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

    // Nueva función: Obtener citas por bloque (agenda)
    async getCitasByAgenda(): Promise<string[]> {
        const querySnapshot = await getDocs(this._collection);
        const citasTomadas: string[] = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data() as CitaLicencia;
            citasTomadas.push(data.agenda); // Guardar las horas (agenda) ya reservadas
        });

        return citasTomadas; // Retorna un arreglo con las agendas ocupadas (ej: '12:30/Jueves')
    }
}