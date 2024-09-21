import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthStateService } from '../data-access/auth-state.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-layout',
  template: ` <header
      class="border border-white rounded bg-gray-900 h-[80px] mb-8 w-full max-w-screen-lg mx-auto px-4"
    >
      <nav class="flex items-center justify-between h-full">
        <a class="text-2xl font-bold">Licencia de conducir</a>
        <ul
          class="items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <a
              routerLink="/tramites"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
              >Tramites</a
            >
          </li>
          <li>
            <button
              type="button"
              class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              (click)="logOut()"
            >
              Cerrar Sesion
            </button>
          </li>
        </ul>
      </nav>
    </header>
    <router-outlet />`,
})

//Este componente pertenece a la navBar dentro de la ruta 'tramites'
export default class LayoutComponent {
  private _router = inject(Router);
  private _authState = inject(AuthStateService);

  async logOut() {
    await this._authState.logOut();
    this._router.navigateByUrl('auth/log-in');
  }//Funcion para cerrar sesion
}
