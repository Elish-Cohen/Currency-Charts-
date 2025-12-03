import { Component, Output, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-range',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './range.component.html',
  styleUrl: './range.component.css'
})
export class RangeComponent {
  @Output() rangeSelected = new EventEmitter<string>();
  ranges = [
    { label: 'שבוע', value: 'week' },
    { label: 'חודש', value: 'month' },
    { label: 'חצי שנה', value: 'halfyear' },
    { label: 'שנה', value: 'year' }
  ];

  selectRange(event: Event) {
    const range=event.target as HTMLSelectElement
    this.rangeSelected.emit(range.value);
  }
}

