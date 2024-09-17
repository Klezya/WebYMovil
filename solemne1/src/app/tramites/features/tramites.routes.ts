import {Routes} from '@angular/router'

export default [
    {
        path: '',
        loadComponent: () => import('./tramite-list/tramite-list.component')
    }
] as Routes 