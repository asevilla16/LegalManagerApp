import { Component } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { MonthCases, MonthlyCases } from './models/month-cases';

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

  practiceAreaData: any[] = [];
  practiceAreaLabels: string[] = [];

  casesByStatusLabels: string[] = [];
  casesByStatusData: any[] = [];

  casesByMonth: MonthlyCases[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadTotalCases();
    this.loadTotalClients();
    this.loadCasesByStatus();
    this.loadActiveAndInactiveCases();
    this.loadCasesByPracticeArea();
  }

  loadCasesByPracticeArea(): void {
    this.dashboardService.getCasesByPracticeArea().subscribe((data) => {
      this.practiceAreaLabels = data.map((item) => item.practiceArea);
      this.practiceAreaData = data.map((item) => item.count);
      console.log(this.practiceAreaLabels, this.practiceAreaData);
    });
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
        this.casesByStatusData = data.map((item) => item.count);
        this.casesByStatusLabels = data.map((item) => item.status);
        data.forEach((item) => {
          switch (item.status) {
            case 'Open':
              this.openCases = item.count;
              console.log(item.count);
              break;
            case 'Closed':
              this.closedCases = item.count;
              break;
            case 'In Progress':
              this.inProgressCases = item.count;
              break;
            case 'Pending':
              this.pendingCases = item.count;
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
