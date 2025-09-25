import { Component, OnInit, signal } from '@angular/core';
import { Case } from '../../models/case';
import { CasesService } from '../../services/cases.service';
import { Router } from '@angular/router';
import {
  PaginatedResponse,
  Pagination,
} from '../../../../core/models/PaginatedResponse';

@Component({
  selector: 'app-cases-table',
  standalone: false,
  templateUrl: './cases-table.component.html',
  styleUrl: './cases-table.component.css',
})
export class CasesTableComponent implements OnInit {
  cases = signal<Case[]>([]);

  pagination: Pagination = { currentPage: 1, pageSize: 5, totalItems: 0 };

  constructor(private caseService: CasesService, private router: Router) {}

  ngOnInit(): void {
    this.loadCases();
  }

  loadCases() {
    this.caseService
      .getPaginatedCases(this.pagination.pageSize, this.pagination.currentPage)
      .subscribe({
        next: (res: PaginatedResponse<Case[]>) => {
          console.log({ res });
          this.cases.set(res.data as Case[]);
          this.pagination = {
            ...this.pagination,
            currentPage: res.page,
            totalItems: res.totalItems,
          };
        },
        error: (error) => {
          console.error('Error fetching cases:', error);
        },
      });
  }

  getClientName(caseItem: Case): string {
    const clientParty = caseItem.parties?.find((x) => x.isClient);
    return clientParty?.name ?? '';
  }

  get totalPages(): number {
    return Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pagination.currentPage = page;
      this.loadCases();
    }

    console.log(this.pagination);
  }

  getPages(): number[] {
    const pages = [];
    const startPage = Math.max(1, this.pagination.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.pagination.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  editCase(id: number) {
    this.router.navigate(['/cases/details', id]);
  }
}
