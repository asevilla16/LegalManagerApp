import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-bar-chart',
  standalone: false,
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadCasesByAttorney();
  }

  loadCasesByAttorney() {
    this.dashboardService.getCasesByStatus().subscribe({
      next: (data: any) => {
        const chartData = data.map((item: any) => item.count);
        console.log('Chart Data:', chartData);
        this.barChartData.labels = data.map((item: any) => item.status);
        // this.barChartData.datasets = [
        //   {
        //     data: data.map((item: any) => item.activeCases),
        //     label: 'Active Cases',
        //     backgroundColor: '#36A2EB'
        //   },
        //   {
        //     data: data.map((item: any) => item.closedCases),
        //     label: 'Closed Cases',
        //     backgroundColor: '#4BC0C0'
        //   }
        // ];
        this.barChartData.datasets = [
          {
            data: chartData,
            label: 'Cases by Status',
            backgroundColor: '#FF6384',
          },
        ];
        this.chart?.update();
        console.log(this.barChartData.datasets);
      },
      error: (error) => {
        console.error('Error loading cases by attorney:', error);
      },
    });
  }
}
