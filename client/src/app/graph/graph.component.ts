import { Component, Input, OnChanges } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CoinService } from '../services/coin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts/core';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  LineChart,
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
]);

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxEchartsModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnChanges {
  @Input() selectedCoin!: string;
  @Input() selectedRange!: string;

  chartOptions: any = {};
  chartType: string = '';
  loading = false;
  showGraph = false;
  constructor(private coinService: CoinService) {}

  ngOnChanges(): void {
    if (this.showGraph && this.selectedCoin && this.selectedRange) {
      this.loading = true;
      this.coinService
        .getCoinData(this.selectedCoin, this.selectedRange)
        .subscribe((data) => {
          const allDates = data.map((d: any) =>
            new Date(d.date).toLocaleDateString()
          );
          const allPrices = data.map((d: any) => d.price);
          const min = Math.min(...allPrices);
          const max = Math.max(...allPrices);
          console.log('data', data);
          // פילטור תאריכים לפי טווח נבחר
          let dates = allDates;
          let prices = allPrices;

          if (this.selectedRange === 'month') {
            dates = dates.filter((_, i) => i % 2 === 0);
            prices = prices.filter((_, i) => i % 2 === 0);
          }
          if (this.selectedRange == 'halfyear') {
            const step = Math.floor(dates.length / 6);
            dates = dates.filter((_, i) => i % step === 0);
            prices = prices.filter((_, i) => i % step === 0);
          }
          if (this.selectedRange == 'year') {
            const step = Math.floor(dates.length / 12);
            dates = dates.filter((_, i) => i % step === 0);
            prices = prices.filter((_, i) => i % step === 0);
          }

          this.chartOptions = {
            title: {
              text: `שער ${this.selectedCoin.toUpperCase()}`,
              left: 'center',
            },
            tooltip: {
              trigger: 'axis',
            },
            xAxis:
              this.chartType === 'pie'
                ? undefined
                : {
                    type: 'category',
                    data: dates,
                    axisLabel: {
                      rotate: 45,
                      interval: 0,
                    },
                  },
            yAxis:
              this.chartType === 'pie'
                ? undefined
                : {
                    type: 'value',
                    min: Math.floor(min * 0.95 * 100) / 100, // קצת מתחת למינימום
                    max: Math.ceil(max * 1.05 * 100) / 100, // קצת מעל למקסימום
                    splitNumber: 8,
                  },
            series: [
              this.chartType === 'pie'
                ? {
                    type: 'pie',
                    radius: '60%',
                    data: data.map((point: any) => ({
                      name: new Date(point.date).toLocaleDateString(),
                      value: point.price,
                    })),
                  }
                : {
                    name: this.selectedCoin.toUpperCase(),
                    type: this.chartType,
                    data: prices,
                    smooth: this.chartType === 'line',
                    showSymbol: true,
                    symbolSize: 8,
                    lineStyle:
                      this.chartType === 'line'
                        ? {
                            width: 3,
                            color: new echarts.graphic.LinearGradient(
                              0,
                              0,
                              1,
                              0,
                              [
                                { offset: 0, color: '#fff2cc' }, // זהב בהיר מאוד
                                { offset: 1, color: '#ffd966' }, // זהב נעים
                              ]
                            ),
                          }
                        : undefined,
                    itemStyle: {
                      color:
                        this.chartType === 'line'
                          ? '#ffa500'
                          : (params: any) => {
                              const colors = [
                                '#fff2cc',
                                '#ffe599',
                                '#ffd966',
                                '#f1c232',
                                '#bf9000',
                              ];
                              return colors[params.dataIndex % colors.length];
                            },
                      borderColor: '#fff',
                      borderWidth: 1,
                    },
                  },
            ],
          };

          this.loading = false;
        });
    }
  }
}
