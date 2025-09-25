import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import {
  provideCharts,
  withDefaultRegisterables,
  BaseChartDirective,
} from 'ng2-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { CasesOfMonthTableComponent } from './components/cases-of-month-table/cases-of-month-table.component';

@NgModule({
  declarations: [DashboardComponent, LineChartComponent, PieChartComponent, BarChartComponent, CasesOfMonthTableComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    BaseChartDirective,
  ],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class DashboardModule {}
