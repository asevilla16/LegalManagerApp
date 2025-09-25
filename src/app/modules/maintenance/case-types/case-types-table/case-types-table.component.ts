import { Component, OnInit, signal } from '@angular/core';
import { CaseType } from '../../models/case-type';
import { CaseTypesService } from '../../services/case-types.service';

@Component({
  selector: 'app-case-types-table',
  standalone: false,
  templateUrl: './case-types-table.component.html',
  styleUrl: './case-types-table.component.css',
})
export class CaseTypesTableComponent implements OnInit {
  caseTypes = signal<CaseType[]>([]);

  constructor(private caseTypesService: CaseTypesService) {}

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
}
