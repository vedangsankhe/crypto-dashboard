import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { WatchlistComponent } from './features/watchlist/watchlist.component';
import { watchlistGuard } from './core/guards/watchlist.guard';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'watchlist',
        component: WatchlistComponent,
        canActivate: [watchlistGuard]
    }
];
