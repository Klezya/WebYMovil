import { inject, Injectable } from '@angular/core';
import { Auth, signInAnonymously, signOut } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth = inject(Auth)

  logIn(){
    return signInAnonymously(this._auth)
  }

}
