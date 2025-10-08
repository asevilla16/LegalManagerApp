import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-pie-chart',
  standalone: false,
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent implements OnChanges {
  @Input() data: any;
  @Input() labels: any;

  public pieChartType: ChartType = 'pie';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnChanges() {
    this.pieChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
        },
      ],
    };
    this.chart?.update();
  }
}
