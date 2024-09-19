import { inject, Injectable } from "@angular/core";
import { Auth, authState, deleteUser, signOut, User, user } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {

    private _auth = inject(Auth)

    get authState$(): Observable<any> {
        return authState(this._auth)
    }


    //LogOut que elimina la cuenta anonima para evitar sobrecarga de Cuentas en firebase
    async logOut(){

        const user = this._auth.currentUser;

        if (user && user.isAnonymous) {
            try {
                await deleteUser(user);
            } catch (error) {
                console.error('Error al eliminar la cuenta:', error);
            }
        }
        return signOut(this._auth)
    }
}