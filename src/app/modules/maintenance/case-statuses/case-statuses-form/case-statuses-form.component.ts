import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseStatusesService } from '../../services/case-statuses.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-case-statuses-form',
  standalone: false,
  templateUrl: './case-statuses-form.component.html',
  styleUrl: './case-statuses-form.component.css',
})
export class CaseStatusesFormComponent implements OnInit {
  caseStatusForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private caseStatusesService: CaseStatusesService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.caseStatusForm = this.formBuilder.group({
      id: [0],
      name: [''],
      code: [''],
      isFinal: [false],
      sortOrder: [0],
      isActive: [true],
    });
  }

  handleSubmit() {
    if (this.caseStatusForm.valid) {
      const { id, isActive, ...caseTypeData } = this.caseStatusForm.value;

      this.caseStatusesService.createCaseStatus(caseTypeData).subscribe({
        next: (response) => {
          this.toastr.success('Se agrego un nuevo registro', 'Exito');
          this.router.navigate(['/maintenance/case-statuses']);
        },
        error: (error) => {
          console.error('Error creating case type:', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }

  cancel() {
    this.router.navigate(['/maintenance/case-statuses']);
  }
}
