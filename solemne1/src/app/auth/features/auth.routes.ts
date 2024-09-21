import { Routes } from "@angular/router";

//Dentro del PATH 'auth' se crea el sub path 'log-in'
export default [
    {
        path: 'log-in',
        loadComponent: () => import('./log-in/log-in.component')
    }
] as Routes