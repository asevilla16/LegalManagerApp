import { Component } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { MonthCases } from './models/month-cases';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  currentYear: number = new Date().getFullYear();

  totalClients: number = 0;
  totalCases: number = 0;
  openCases: number = 0;
  closedCases: number = 0;
  inProgressCases: number = 0;
  pendingCases: number = 0;
  activeCases: number = 0;
  inactiveCases: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadTotalCases();
    this.loadTotalClients();
    this.loadCasesByStatus();
    this.loadActiveAndInactiveCases();
  }

  loadTotalCases() {
    this.dashboardService.getAllCases().subscribe({
      next: (res) => {
        this.totalCases = res;
      },
      error: (err) => {
        console.error('Error fetching total cases:', err);
      },
    });
  }

  loadTotalClients() {
    this.dashboardService.getTotalClients().subscribe({
      next: (response) => {
        this.totalClients = response;
      },
      error: (error) => {
        console.error('Error fetching total clients:', error);
      },
    });
  }

  loadCasesByStatus() {
    this.dashboardService.getCasesByStatus().subscribe({
      next: (data) => {
        console.log({ data });
        data.forEach((item) => {
          switch (item.status) {
            case 'Open':
              this.openCases = item._count.id;
              console.log(item._count);
              break;
            case 'Closed':
              this.closedCases = item._count.id;
              break;
            case 'In Progress':
              this.inProgressCases = item._count.id;
              break;
            case 'Pending':
              this.pendingCases = item._count.id;
              break;
            default:
              break;
          }
        });
      },
      error: (error) => {
        console.error('Error fetching cases by status:', error);
      },
    });
  }
  loadActiveAndInactiveCases() {
    this.dashboardService.getActiveAndInactiveCases().subscribe({
      next: (data) => {
        data.forEach((item) => {
          if (item.status === 'Active') {
            this.activeCases = item._count;
          } else if (item.status === 'Inactive') {
            this.inactiveCases = item._count;
          }
        });
      },
      error: (error) => {
        console.error('Error fetching active and inactive cases:', error);
      },
    });
  }
}
