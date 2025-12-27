import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly BASE_URL = 'https://api.coingecko.com/api/v3/' 
  // revents accidental modification API 
  // URLs should not change at runtime

  constructor(private http: HttpClient) {}

  //The return type is an Observable<any[]>, 
  //meaning it will return an observable stream of an array of data about the coins.

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
