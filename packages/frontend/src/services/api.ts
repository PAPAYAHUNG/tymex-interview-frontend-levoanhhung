import axios from 'axios';
import { PaginationParams, ProductsResponse } from '../types/api';

const API_BASE_URL = 'http://localhost:5005';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async (params: PaginationParams): Promise<ProductsResponse> => {
  const { data } = await api.get('/api/products', { params });
  return data;
};

export default api; 