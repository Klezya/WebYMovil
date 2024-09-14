import { Routes } from "@angular/router";

export default [
    {
        path: 'sign-up',
        loadComponent: () => import('./sign-up/sign-up.component')
    },
    {
        path: 'log-in',
        loadComponent: () => import('./log-in/log-in.component')
    }
] as Routes