import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CaseTypesService } from '../../services/case-types.service';

@Component({
  selector: 'app-case-types-form',
  standalone: false,
  templateUrl: './case-types-form.component.html',
  styleUrl: './case-types-form.component.css',
})
export class CaseTypesFormComponent implements OnInit {
  caseTypeForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private caseTypesService: CaseTypesService,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.caseTypeForm = this.formBuilder.group({
      id: [0],
      name: [''],
      code: [''],
      category: [''],
      statuteOfLimitationDays: [0],
      description: [''],
      isActive: [true],

      // modifiedBy: [this.authService.currentUserValue?.username || ''],
    });
  }

  handleSubmit() {
    if (this.caseTypeForm.valid) {
      const { id, isActive, ...caseTypeData } = this.caseTypeForm.value;

      this.caseTypesService.createCaseType(caseTypeData).subscribe({
        next: (response) => {
          console.log('Case type created successfully:', response);
          this.router.navigate(['/maintenance/case-types']);
        },
        error: (error) => {
          console.error('Error creating case type:', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
