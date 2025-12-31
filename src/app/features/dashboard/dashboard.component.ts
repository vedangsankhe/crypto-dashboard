import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { finalize } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, of } from 'rxjs';
import { coin } from '../../core/services/models/coin.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  coins$!: Observable<coin[]>;

  loading = true;

  error: string | null = null;

  constructor(private apiService: ApiService) {}

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


  ngOnInit(): void {
    this.loadCoins();
  }

  trackById(index: number, coin: coin) {
  return coin.id;
}

}
