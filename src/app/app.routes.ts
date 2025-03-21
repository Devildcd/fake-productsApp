import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
    },
    {
        path: '',
        loadComponent: () =>
            import('./layouts/dashboard/dashboard.component'),
        children: [
            {
                path: 'products',
                loadChildren: () => import('./features/products/product.routes')
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'products',
        pathMatch: 'full',
    },
];