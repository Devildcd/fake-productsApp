import { Routes } from '@angular/router';

export default [
    {
        path: 'list',
        loadComponent: () => import('./pages/list-products/list-products.component'),
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },

] as Routes;