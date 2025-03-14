import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/api';
import { PaginationParams } from '../types/api';

export const useProducts = (params: PaginationParams = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    refetchInterval: 60000, // Auto-refresh every 60 seconds
  });
}; 