import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '../services/api';
import { PaginationParams, ProductsResponse } from '../types/api';
import { REFRESH_INTERVAL } from '@/constants';

export const useProducts = (params: PaginationParams = {}) => {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: ({ pageParam }) => getProducts({ ...params, _page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasMore) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    refetchInterval: REFRESH_INTERVAL, // Auto-refresh every 60 seconds
    initialPageParam: 1,
  });
}; 