import { Component, OnInit, signal } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-table',
  standalone: false,
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css',
})
export class CategoriesTableComponent implements OnInit {
  categories = signal<Category[]>([]);

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories.set(categories as Category[]);
        console.log(this.categories());
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      },
    });
  }

  editCategory(category: Category) {
    this.router.navigate(['/maintenance/categories/edit', category.id]);
  }

  deleteCategory(categoryId: number) {
    this.categoriesService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.categories.update((categories) =>
          categories.filter((cat) => cat.id !== categoryId),
        );
        this.toastr.success('Category deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting category:', error);
      },
    });
  }
}
