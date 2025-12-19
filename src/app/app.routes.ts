import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { WatchlistComponent } from './features/watchlist/watchlist.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'watchlist',
        component: WatchlistComponent
    }
];
