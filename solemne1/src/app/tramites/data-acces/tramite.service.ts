import { inject, Injectable } from "@angular/core"
import { toSignal } from "@angular/core/rxjs-interop"
import { addDoc, collection, Firestore, collectionData, where, query } from "@angular/fire/firestore"
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
    private _colllection = collection(this._firestore,PATH)


    getCitaByRun(run: string): Observable<CitaLicencia[]>{
        const q = query(this._colllection, where('run','==',run))
        return collectionData(q, {tramite: 'tramite'}) as Observable<CitaLicencia[]>
    }

    create(cita: CitaLicencia){
        return addDoc(this._colllection, cita)
    }
}