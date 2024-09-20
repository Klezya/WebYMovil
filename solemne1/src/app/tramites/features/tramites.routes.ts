import {Routes} from '@angular/router'

export default [
    {
        path: '',
        loadComponent: () => import('./tramite-list/tramite-list.component')
    },
    {
        path: 'form',
        loadComponent: () => import('./tramite-form-primeraVez/tramite-form.component')
    }
] as Routes 