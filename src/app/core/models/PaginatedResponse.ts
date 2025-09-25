export interface PaginatedResponse<T> {
  page: number;
  pageSize: number;
  totalItems: number;
  lastPage: number;
  data: T;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}
