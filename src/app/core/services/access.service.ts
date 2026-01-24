import { Injectable } from '@angular/core';
import { WatchlistService } from './watchlist.service';

@Injectable({ providedIn: 'root' })
export class AccessService {

  constructor(private watchlistService: WatchlistService) {}

  canAccessWatchlist(): boolean {
    return this.watchlistService.getWatchlist().length > 0;
  }
}
