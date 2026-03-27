import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CaseTypesService } from '../../services/case-types.service';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-case-types-form',
  standalone: false,
  templateUrl: './case-types-form.component.html',
  styleUrl: './case-types-form.component.css',
})
export class CaseTypesFormComponent implements OnInit {
  caseTypeForm: FormGroup = new FormGroup({});

  caseTypeId: number | null = null;

  categories = signal<Category[]>([]);

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private caseTypesService: CaseTypesService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.caseTypeId = +idParam;
        this.loadCaseTypeData(this.caseTypeId);
      }
    });
    this.getCategories();
  }

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

  loadCaseTypeData(id: number) {
    this.caseTypesService.getCaseType(id).subscribe({
      next: (caseType) => {
        this.caseTypeForm.patchValue(caseType);
      },
      error: (error) => {
        console.error('Error loading case type data:', error);
      },
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response) => {
        this.categories.set(response as Category[]);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  handleSubmit() {
    if (this.caseTypeForm.valid) {
      const { id, isActive, ...caseTypeData } = this.caseTypeForm.value;
    }
    if (this.caseTypeId) {
      this.handleEdit();
    } else {
      this.handleSave();
    }
  }

  handleSave() {
    if (this.caseTypeForm.valid) {
      const { id, isActive, ...caseTypeData } = this.caseTypeForm.value;

      this.caseTypesService.createCaseType(caseTypeData).subscribe({
        next: (response) => {
          console.log('Case type created successfully:', response);
          this.toastr.success('Tipo de caso creado exitosamente');
          this.router.navigate(['/maintenance/case-types']);
        },
        error: (error) => {
          console.error('Error creating case type:', error);
          this.toastr.error('Error creating case type');
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }

  handleEdit() {
    const { id, category, isActive, ...caseTypeData } = this.caseTypeForm.value;

    this.caseTypesService
      .updateCaseType(this.caseTypeId ?? 0, caseTypeData)
      .subscribe({
        next: (response) => {
          console.log('Case type updated successfully:', response);
          this.toastr.success('Tipo de caso actualizado exitosamente');
          this.router.navigate(['/maintenance/case-types']);
        },
        error: (error) => {
          console.error('Error updating case type:', error);
        },
      });
  }
}
