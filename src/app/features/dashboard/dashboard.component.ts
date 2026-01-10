import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { finalize } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, of } from 'rxjs';
import { coin } from '../../core/services/models/coin.model';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  coins$!: Observable<coin[]>;

  loading = true;

  error: string | null = null;

  searchText = '';

  searchControl = new FormControl('');

  debouncedSearchText = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCoins()

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.debouncedSearchText = value ?? '';
      });
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
  if (!this.debouncedSearchText) {
    return coins;
  }

  return coins.filter((coin) =>
    coin.name
      .toLowerCase()
      .includes(this.debouncedSearchText.toLowerCase())
  );
}


}
