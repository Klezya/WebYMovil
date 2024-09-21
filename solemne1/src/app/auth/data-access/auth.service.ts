import { inject, Injectable } from '@angular/core';
import { Auth, signInAnonymously, signOut } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})

//servicio de logIn de forma anonima en firebase para evitar el requerir contraseñas y correos u otro tipo de verificacion
//Este servicio esta esfecializado solamente para atender las necesidades del 'log-in'
export class AuthService {

  private _auth = inject(Auth)

  logIn(){
    return signInAnonymously(this._auth)
  }

}
