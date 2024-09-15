import {Routes} from '@angular/router'

export default [
    {
        path: 'tramites',
        loadComponent: () => import('./tramite-list/tramite-list.component')
    }
] as Routes 