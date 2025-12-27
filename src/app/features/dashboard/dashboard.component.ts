import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { finalize } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  coins$!: Observable<any[]>;

  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.coins$ = this.apiService.getCoins().pipe(
    finalize(() => {
      this.loading = false;
    })
  );
  }

  trackById(index: number, coin: any) {
  return coin.id;
}

}
