// coin.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coin',
  standalone: true,
  imports: [CommonModule],
 templateUrl: './coin.component.html',
  styleUrl: './coin.component.css'
})
export class CoinComponent {
  @Output() coinSelected = new EventEmitter<string>();

  coins = ["USD", "EUR", "GBP", "JPY"]; 

  onCoinChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.coinSelected.emit(select.value);
  }
}