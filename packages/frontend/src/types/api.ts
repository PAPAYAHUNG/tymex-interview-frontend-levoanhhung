export interface Author {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  avatar: string;
  onlineStatus: string;
}

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  isFavorite: boolean;
  createdAt: number;
  theme: string;
  tier: string;
  imageId: number;
  author: Author;
}

export interface PaginationParams {
  _page?: number;
  _limit?: number;
  category?: string;
  tier?: string;
  theme?: string;
  search?: string;
  _sort?: string;
  _order?: 'asc' | 'desc';
  priceMin?: number;
  priceMax?: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface ProductsResponse {
  data: Product[];
  pagination: PaginationInfo;
} 