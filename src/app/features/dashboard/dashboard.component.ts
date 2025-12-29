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

  ngOnInit(): void {
    this.coins$ = this.apiService.getCoins().pipe(
      catchError((err) => {
        this.error = "Failed to load cryptocurrency data, please try again later";
        return of([]); //returning empty array so UI doesnt break

      }),

    finalize(() => {
      this.loading = false;
    })
  );
  }

  trackById(index: number, coin: coin) {
  return coin.id;
}

}
