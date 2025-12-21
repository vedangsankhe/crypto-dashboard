import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  coins$!: Observable<any[]>;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.coins$ = this.apiService.getCoins();
  }

  trackById(index: number, coin: any) {
  return coin.id;
}

}
