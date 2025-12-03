
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Coin {
  date: string;
  price: number;
}
@Injectable({
  providedIn: 'root',
})
export class CoinService {
  private apiUrl = 'https://localhost:7060/api/Coins'; 

  constructor(private http: HttpClient) {}

  getCoinData(coin: string, range: string): Observable<Coin[]> {
    console.log('Coin:', coin);
    console.log('Range:', range);
    const url = `${this.apiUrl}/${range}/${coin}`;
    return this.http.get<Coin[]>(url);
  }
}
