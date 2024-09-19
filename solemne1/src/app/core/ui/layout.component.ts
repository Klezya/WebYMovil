import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthStateService } from "../data-access/auth-state.service";
import { RouterLink } from "@angular/router";

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'app-layout',
    template:`
    <header class="bg-gray-900 h-[80px] mb-8 w-full max-w-screen-lg mx-auto px-4">
      <nav class="flex items-center justify-between h-full" >
        <a class="text-2xl font-bold" routerLink="/tramites">Licencia de conducir</a>
        <button
          type="button"
          class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          (click)="logOut()"
        >
          Cerrar Sesion
        </button>
      </nav>
    </header>
    <router-outlet />`
})

export default class LayoutComponent {

    private _router = inject(Router)
    private _authState = inject(AuthStateService)

    async logOut(){
        await this._authState.logOut()
        this._router.navigateByUrl('auth/log-in')
    }
}