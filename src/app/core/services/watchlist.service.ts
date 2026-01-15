import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor() { }

  private key = 'watchlist';

  getWatchlist(): any[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  addToWatchlist(coin: any) {
    const list = this.getWatchlist();

    if (!list.find(c => c.id === coin.id)) {
      list.push(coin);
      localStorage.setItem(this.key, JSON.stringify(list));
    }
  }

  removeFromWatchlist(id: string) {
    const list = this.getWatchlist().filter(c => c.id !== id);
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  isInWatchlist(id: string): boolean {
    return this.getWatchlist().some(c => c.id === id);
  }

}
