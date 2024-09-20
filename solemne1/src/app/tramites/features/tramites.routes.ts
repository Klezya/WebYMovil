import {Routes} from '@angular/router'

export default [
    {
        path: '',
        loadComponent: () => import('./tramite-list/tramite-list.component')
    },
    {
        path: 'nueva-licencia',
        loadComponent: () => import('./tramite-form-primeraVez/tramite-form.component')
    },
    {
        path: 'renovacion',
        loadComponent: () => import('./tramite-form-renovacion/tramite-form-renovacion.component')
    },
    {
        path: 'cambio-datos',
        loadComponent: () => import('./tramite-form-cambio-datos/tramite-form-cambio-datos.component')
    },
    {
        path: 'reservar-hora',
        loadComponent: () => import('./tramite-agenda/tramite-agenda.component')
    }
] as Routes 