import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-cases-of-month-table',
  standalone: false,
  templateUrl: './cases-of-month-table.component.html',
  styleUrl: './cases-of-month-table.component.css',
})
export class CasesOfMonthTableComponent {
  casesOfTheMonth: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadCasesOfTheMonth();
  }

  loadCasesOfTheMonth() {
    this.dashboardService.getCasesOfTheMonth().subscribe({
      next: (data: any) => {
        this.casesOfTheMonth = data.cases;
        console.log('Cases of the Month:', this.casesOfTheMonth);
      },
      error: (error) => {
        console.error('Error fetching cases of the month:', error);
      },
    });
  }

  getAssignedLawyer(assignments: any[]) {
    if (assignments.length === 0) {
      return 'Sin Asignar';
    }
    return `${assignments[0].firstName} ${assignments[0].lastName}` || '';
  }
}
