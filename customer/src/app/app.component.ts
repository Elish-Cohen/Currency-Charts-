// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { RangeComponent } from './range/range.component';
// import { CoinComponent } from './coin/coin.component';
// import { GraphComponent } from './graph/graph.component';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, RangeComponent,CoinComponent,GraphComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'coins';
// }


import { Component } from '@angular/core';
import {CommonModule } from '@angular/common';
import { RangeComponent } from './range/range.component';
import { CoinComponent } from './coin/coin.component';
import { GraphComponent } from './graph/graph.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RangeComponent, CoinComponent, GraphComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'coins';
  selectedCoin='';
  selectedRange='';

  onRangeSelected(range: string) {
    this.selectedRange = range;
  }

  onCoinSelected(coin: string) {
    this.selectedCoin = coin;
  }
}
