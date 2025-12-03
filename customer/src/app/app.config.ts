// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http';
// import { provideECharts } from 'ngx-echarts';
// import * as echarts from 'echarts';
// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),provideECharts({ echarts })]
// };

// app.config.ts
// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideECharts } from 'ngx-echarts';
// import * as echarts from 'echarts';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter([]),
//     provideECharts({ echarts }), // עובד בגרסה העדכנית של ngx-echarts
//   ],
// };
// import { ApplicationConfig } from '@angular/core';
// import { provideHttpClient } from '@angular/common/http';
// import { provideEchartsCore } from 'ngx-echarts';
// import * as echarts from 'echarts/core';
// import { LineChart } from 'echarts/charts';
// import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
// import { CanvasRenderer } from 'echarts/renderers';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideHttpClient(),
//     provideEchartsCore(
//       {
//         echarts,
//         use: [
//           LineChart,
//           TitleComponent,
//           TooltipComponent,
//           LegendComponent,
//           GridComponent,
//           CanvasRenderer
//         ]
//       }
//     )
//   ]
// };

import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideEchartsCore } from 'ngx-echarts';
import { echarts } from './echarts'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideEchartsCore({ echarts })
  ]
};
