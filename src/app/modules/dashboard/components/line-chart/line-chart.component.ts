import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../services/dashboard.service';
import { MonthlyCases } from '../../models/month-cases';

@Component({
  selector: 'app-line-chart',
  standalone: false,
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent implements OnInit {
  @Input() cases?: MonthlyCases[] = [];

  selectedYears: number[] = [2024, 2025]; // Years to display
  currentYear: number = new Date().getFullYear();

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Cases Created',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 0.8)',
        fill: 'origin',
        tension: 0.4,
      },
    ],
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    elements: {
      line: {
        tension: 0.4,
      },
    },
    scales: {
      y: {
        position: 'left',
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Number of Cases',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cases Created by Month',
      },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadCasesByMonth();
  }

  loadCasesByMonth(): void {
    this.dashboardService.getCasesByMonth().subscribe({
      next: (data: MonthlyCases[]) => {
        this.cases = data;
        console.log('Cases by month:', this.cases);
        this.updateChartDataWithYears(this.cases);
      },
      error: (error) => {
        console.error('Error fetching cases by month:', error);
      },
    });
  }

  private updateChartData(data: any[]) {
    const labels = data.map((item) => item.month);
    const counts = data.map((item) => item.caseCount);

    this.lineChartData.labels = labels;
    this.lineChartData.datasets[0].data = counts;

    // Update chart if it exists
    this.chart?.update();
  }

  private updateChartDataWithYears(data: MonthlyCases[]) {
    // Group data by year
    const yearGroups = data.reduce((acc, item) => {
      if (!acc[item.year]) {
        acc[item.year] = {};
      }
      acc[item.year][item.month] = item.count;
      return acc;
    }, {} as { [year: number]: { [month: string]: number } });

    // Create datasets for each year
    const colors = [
      'rgba(54, 162, 235, 1)', // Blue
      'rgba(255, 99, 132, 1)', // Red
      'rgba(255, 205, 86, 1)', // Yellow
      'rgba(75, 192, 192, 1)', // Green
    ];

    this.lineChartData.datasets = Object.keys(yearGroups).map((year, index) => {
      const yearData = yearGroups[parseInt(year)];
      const monthData = this.lineChartData.labels!.map(
        (month) => yearData[month as string] || 0
      );

      return {
        data: monthData,
        label: `Cases ${year}`,
        backgroundColor: colors[index % colors.length].replace('1)', '0.2)'),
        borderColor: colors[index % colors.length],
        pointBackgroundColor: colors[index % colors.length],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors[index % colors.length],
        fill: false,
        tension: 0.4,
      };
    });

    this.chart?.update();
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
    console.log(this.cases);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }
}
