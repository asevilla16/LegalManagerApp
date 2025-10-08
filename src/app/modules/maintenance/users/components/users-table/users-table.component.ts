import { Component, signal } from '@angular/core';
import { User } from '../../../../../core/models/user';
import { AuthService } from '../../../../../core/services/auth.service';
import { Pagination } from '../../../../../core/models/PaginatedResponse';

@Component({
  selector: 'app-users-table',
  standalone: false,
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent {
  users = signal<User[]>([]);

  pagination: Pagination = { currentPage: 1, pageSize: 5, totalItems: 0 };

  pageSizeOptions = [5, 10, 15, 20, 25, 50];

  constructor(private usersService: AuthService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService
      .getPaginatedUsers(this.pagination.pageSize, this.pagination.currentPage)
      .subscribe({
        next: (response) => {
          this.users.set(response.data);
          this.pagination.totalItems = response.totalItems;
          console.log(this.users());
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        },
      });
  }

  getFullName(user: User) {
    return `${user.firstName} ${user.middleName ? user.middleName + ' ' : ''}${
      user.lastName
    }`;
  }
}
