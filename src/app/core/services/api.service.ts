import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly BASE_URL = 'https://api.coingecko.com/api/v3/'

  constructor(private http: HttpClient) {}

  getCoins(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.BASE_URL}/coins/markets`,
      {
        params: {
          vs_currency: 'inr',
          order: 'market_cap_desc',
          per_page: '10',
          page: '1',
          sparkline: 'true'
        }
      }
    )
  }
}
