import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { finalize } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, of } from 'rxjs';
import { coin } from '../../core/services/models/coin.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  coins$!: Observable<coin[]>;

  loading = true;

  error: string | null = null;

  searchText = '';

  constructor(private apiService: ApiService) {}

   ngOnInit(): void {
    this.loadCoins()
  }

  loadCoins(): void {
  this.loading = true;
  this.error = null;

  this.coins$ = this.apiService.getCoins().pipe(
    catchError((err) => {
      this.error = 'Failed to load cryptocurrency data. Please try again later.';
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
  if (!this.searchText) {
    return coins;
  }

  return coins.filter((coin) =>
    coin.name.toLowerCase().includes(this.searchText.toLowerCase())
  );
}


}
