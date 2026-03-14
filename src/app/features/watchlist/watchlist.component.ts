import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WatchlistService } from '../../core/services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule, RouterLink],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent implements OnInit {

  coins: any[] = [];

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist(): void {
    this.coins = this.watchlistService.getWatchlist();
  }

  remove(id: string): void {
    this.watchlistService.removeFromWatchlist(id);
    this.loadWatchlist();
  }

  /**
   * Sparkline line points (120×40 viewBox)
   */
  getSparklinePoints(prices: number[] | undefined): string {
    if (!prices || prices.length < 2) return '';

    const step = Math.max(1, Math.floor(prices.length / 50));
    const sampled = prices.filter((_, i) => i % step === 0);

    const min = Math.min(...sampled);
    const max = Math.max(...sampled);
    const range = max - min || 1;

    const w = 120, h = 40, p = 3;

    return sampled.map((price, i) => {
      const x = (i / (sampled.length - 1)) * (w - p * 2) + p;
      const y = h - p - ((price - min) / range) * (h - p * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  }

  /**
   * Sparkline filled area (closes path at bottom)
   */
  getSparklineArea(prices: number[] | undefined): string {
    if (!prices || prices.length < 2) return '';

    const step = Math.max(1, Math.floor(prices.length / 50));
    const sampled = prices.filter((_, i) => i % step === 0);

    const min = Math.min(...sampled);
    const max = Math.max(...sampled);
    const range = max - min || 1;

    const w = 120, h = 40, p = 3;

    const pts = sampled.map((price, i) => {
      const x = (i / (sampled.length - 1)) * (w - p * 2) + p;
      const y = h - p - ((price - min) / range) * (h - p * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    // Close the area at the bottom
    const firstX = p.toFixed(1);
    const lastX  = (w - p).toFixed(1);
    const bottom = (h - p).toFixed(1);

    return `${firstX},${bottom} ${pts.join(' ')} ${lastX},${bottom}`;
  }
}