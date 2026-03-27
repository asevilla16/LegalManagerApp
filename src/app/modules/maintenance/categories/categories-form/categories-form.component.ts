import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-form',
  standalone: false,
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.css',
})
export class CategoriesFormComponent {
  categoryForm: FormGroup = new FormGroup({});

  categoryId: number | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
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
        this.categoryId = +idParam;
        this.loadCategoryData(this.categoryId);
      }
    });
  }

  buildForm() {
    this.categoryForm = this.formBuilder.group({
      id: [0],
      name: [''],
      code: [''],
      description: [''],
      isActive: [true],
    });
  }

  loadCategoryData(id: number) {
    this.categoriesService.getCategoryById(id).subscribe({
      next: (category) => {
        this.categoryForm.patchValue(category);
      },
      error: (err) => {
        console.error('Error loading category data:', err);
        this.toastr.error('Failed to load category data');
      },
    });
  }

  handleSubmit() {
    if (this.categoryId) {
      this.handleEdit();
    } else {
      this.handleCreate();
    }
  }

  handleCreate() {
    const { id, isActive, ...categoryData } = this.categoryForm.value;
    this.categoriesService.createCategory(categoryData).subscribe({
      next: (response) => {
        this.toastr.success('Category created successfully');
        this.router.navigate(['/maintenance/categories']);
      },
      error: (err) => {
        console.error('Error creating category:', err);
        this.toastr.error('Failed to create category');
      },
    });
  }

  handleEdit() {
    const { id, isActive, ...categoryData } = this.categoryForm.value;
    this.categoriesService
      .updateCategory(this.categoryId ?? 0, categoryData)
      .subscribe({
        next: (response) => {
          this.toastr.success('Category updated successfully');
          this.router.navigate(['/maintenance/categories']);
        },
        error: (err) => {
          console.error('Error updating category:', err);
          this.toastr.error('Failed to update category');
        },
      });
  }

  cancel() {
    this.router.navigate(['/maintenance/categories']);
  }
}
