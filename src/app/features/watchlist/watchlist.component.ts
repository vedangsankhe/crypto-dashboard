import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../../core/services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent {

  coins: any[] = [];

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(){
    this.loadWatchlist()
  }

  loadWatchlist(){
    this.coins = this.watchlistService.getWatchlist();
  }

  remove(id: string){
    this.watchlistService.removeFromWatchlist(id);
    this.loadWatchlist();
  }

}
