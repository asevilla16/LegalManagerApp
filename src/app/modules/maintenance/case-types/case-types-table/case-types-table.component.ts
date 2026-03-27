import { Component, OnInit, signal } from '@angular/core';
import { CaseType } from '../../models/case-type';
import { CaseTypesService } from '../../services/case-types.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-types-table',
  standalone: false,
  templateUrl: './case-types-table.component.html',
  styleUrl: './case-types-table.component.css',
})
export class CaseTypesTableComponent implements OnInit {
  caseTypes = signal<CaseType[]>([]);

  constructor(
    private caseTypesService: CaseTypesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getCaseTypes();
  }

  getCaseTypes() {
    this.caseTypesService.getCaseTypes().subscribe({
      next: (caseTypes: CaseType[]) => {
        this.caseTypes.set(caseTypes as CaseType[]);
        console.log(this.caseTypes());
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      },
    });
  }

  editCaseType(caseType: CaseType) {
    this.router.navigate(['/maintenance/case-types/edit', caseType.id]);
  }

  deleteCaseType(caseType: CaseType) {
    if (
      confirm(
        `¿Estás seguro de que deseas eliminar el tipo de caso "${caseType.name}"?`,
      )
    ) {
      this.caseTypesService.deleteCaseType(caseType.id).subscribe({
        next: () => {
          this.getCaseTypes();
        },
        error: (error) => {
          console.error('Error deleting case type:', error);
        },
      });
    }
  }
}
