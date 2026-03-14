import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { finalize, catchError, of, Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { coin } from '../../core/services/models/coin.model';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { WatchlistService } from '../../core/services/watchlist.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  coins$!: Observable<coin[]>;
  loading = true;
  error: string | null = null;
  searchControl = new FormControl('');
  debouncedSearchText = '';
  currentPage = 1;

  constructor(
    private apiService: ApiService,
    private watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    this.loadCoins();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.debouncedSearchText = value ?? '';
      });
  }

  loadCoins(): void {
    this.loading = true;
    this.error = null;

    this.coins$ = this.apiService.getCoins(this.currentPage).pipe(
      catchError(() => {
        this.error = 'Failed to load cryptocurrency data. Please try again.';
        return of([]);
      }),
      finalize(() => {
        this.loading = false;
      })
    );
  }

  trackById(index: number, coin: coin) {
    return coin.id;
  }

  filterCoins(coins: coin[]): coin[] {
    if (!this.debouncedSearchText) return coins;
    return coins.filter((c) =>
      c.name.toLowerCase().includes(this.debouncedSearchText.toLowerCase())
    );
  }

  nextPage() {
    this.currentPage++;
    this.loadCoins();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCoins();
    }
  }

  toggleWatchlist(coin: any) {
    if (this.watchlistService.isInWatchlist(coin.id)) {
      this.watchlistService.removeFromWatchlist(coin.id);
    } else {
      this.watchlistService.addToWatchlist(coin);
    }
  }

  isInWatchlist(id: string): boolean {
    return this.watchlistService.isInWatchlist(id);
  }

  /**
   * Converts sparkline price array → SVG polyline points string
   * Scales prices to fit within an 80×32 viewBox
   */
  getSparklinePoints(prices: number[] | undefined): string {
    if (!prices || prices.length < 2) return '';

    // Sample down to ~40 points for performance
    const step = Math.max(1, Math.floor(prices.length / 40));
    const sampled = prices.filter((_, i) => i % step === 0);

    const min = Math.min(...sampled);
    const max = Math.max(...sampled);
    const range = max - min || 1;

    const width  = 80;
    const height = 32;
    const padding = 2;

    return sampled
      .map((price, i) => {
        const x = (i / (sampled.length - 1)) * (width - padding * 2) + padding;
        const y = height - padding - ((price - min) / range) * (height - padding * 2);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }
}