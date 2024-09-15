import { Routes } from "@angular/router";

export default [
    {
        path: 'log-in',
        loadComponent: () => import('./log-in/log-in.component')
    }
] as Routes