import { Routes } from '@angular/router';
import { watchlistGuard } from './core/guards/watchlist.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./features/dashboard/dashboard.component')
                .then(m => m.DashboardComponent)
    },
    {
        path: 'watchlist',
        canActivate: [watchlistGuard],
        loadComponent: () =>
            import('./features/watchlist/watchlist.component')
                .then(m => m.WatchlistComponent)
    },

    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
