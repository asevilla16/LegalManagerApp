import { Component, OnInit, signal } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/client';
import {
  PaginatedResponse,
  Pagination,
} from '../../../../core/models/PaginatedResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-table',
  standalone: false,
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.css',
})
export class ClientsTableComponent implements OnInit {
  clients = signal<Client[]>([]);
  pagination: Pagination = { currentPage: 1, pageSize: 5, totalItems: 0 };

  pageSizeOptions = [5, 10, 15, 20, 25, 50];

  constructor(private clientsService: ClientsService, private router: Router) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientsService
      .getPaginatedClients(
        this.pagination.pageSize,
        this.pagination.currentPage
      )
      .subscribe({
        next: (res: PaginatedResponse<Client[]>) => {
          this.clients.set(res.data as Client[]);
          this.pagination = {
            ...this.pagination,
            currentPage: res.page,
            totalItems: res.totalItems,
          };
          console.log(res);
        },
        error: (error) => {
          console.error('Error fetching clients:', error);
        },
      });
  }

  getClientName(client: Client) {
    const clientName = client?.firstName
      ? `${client?.firstName} ${client?.lastName}`
      : client?.companyName;

    return clientName;
  }

  get totalPages(): number {
    return Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pagination.currentPage = page;
      this.getClients();
    }
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

  onPageSizeChange(newPageSize: number) {
    this.pagination.pageSize = newPageSize;
    this.pagination.currentPage = 1;
    this.getClients();
  }

  getCurrentRange(): string {
    const startItem =
      (this.pagination.currentPage - 1) * this.pagination.pageSize + 1;
    const endItem = Math.min(
      this.pagination.currentPage * this.pagination.pageSize,
      this.pagination.totalItems
    );
    return `${startItem} - ${endItem}`;
  }

  editClient(clientId: number) {
    this.router.navigate(['/clients/edit', clientId]);
  }
}
