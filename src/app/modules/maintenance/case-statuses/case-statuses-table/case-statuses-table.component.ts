import { Component, OnInit, signal } from '@angular/core';
import { CaseStatusesService } from '../../services/case-statuses.service';
import { CaseStatus } from '../../models/case-status';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-case-statuses-table',
  standalone: false,
  templateUrl: './case-statuses-table.component.html',
  styleUrl: './case-statuses-table.component.css',
})
export class CaseStatusesTableComponent implements OnInit {
  caseStatuses = signal<CaseStatus[]>([]);

  constructor(
    private toastr: ToastrService,
    private caseStatusesService: CaseStatusesService
  ) {}

  ngOnInit(): void {
    this.getCaseStatuses();
  }

  getCaseStatuses() {
    this.caseStatusesService.getCaseStatuses().subscribe({
      next: (caseStatuses: CaseStatus[]) => {
        console.log(caseStatuses);
        this.caseStatuses.set(caseStatuses as CaseStatus[]);
      },
      error: (error) => {
        console.error('Error fetching case statuses:', error);
      },
    });
  }

  deleteCaseStatus(id: number) {
    this.caseStatusesService.deleteCaseStatus(id).subscribe({
      next: () => {
        this.getCaseStatuses();
        this.toastr.success('Case status deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting case status:', error);
      },
    });
  }
}
