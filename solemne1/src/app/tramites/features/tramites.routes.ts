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
        path: 'modificar-cita',
        loadComponent: () => import('./tramite-form-ver-eliminar-hora/tramite-form-cambio-datos.component')
    },
    {
        path: 'reservar-hora',
        loadComponent: () => import('./tramite-agenda/tramite-agenda.component')
    },
    {
        path: 'reservar-otra-hora',
        loadComponent: () => import('../../calendar/calendar.component')
    }
] as Routes 