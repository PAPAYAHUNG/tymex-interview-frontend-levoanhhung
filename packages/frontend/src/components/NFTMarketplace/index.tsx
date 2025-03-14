import React, { useState, useCallback, useEffect } from 'react';
import { Layout, Spin } from 'antd';
import { useQueryParams, StringParam } from 'use-query-params';
import styles from './styles.module.scss';
import NFTFilter, { FilterParams } from '../NFTFilter';
import NFTCard from '../NFTCard';
import { CategoryTabs } from '../CategoryTabs';

const { Sider, Content } = Layout;

const categories = ['All', 'Upper Body', 'Lower Body', 'Hat', 'Shoes', 'Accessory', 'Legendary', 'Mythic', 'Epic', 'Rare'];

interface NFTProduct {
  id: string;
  title: string;
  price: number;
  category: string;
  tier: string;
  theme: string;
  imageId: string;
  isFavorite: boolean;
  author: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

const queryConfig = {
  category: StringParam,
  search: StringParam,
  tier: StringParam,
  theme: StringParam,
  time: StringParam,
  priceSort: StringParam,
  priceMin: StringParam,
  priceMax: StringParam,
  page: StringParam,
  limit: StringParam,
} as const;

const NFTMarketplace: React.FC = () => {
  const [products, setProducts] = useState<NFTProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [queryParams, setQueryParams] = useQueryParams(queryConfig);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 8,
    total: 0,
    hasMore: false
  });

  // Function to fetch products
  const fetchProducts = useCallback(async (isLoadMore: boolean = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      const params = new URLSearchParams();
      
      if (queryParams.category && queryParams.category !== 'All') {
        params.append('category', queryParams.category);
      }
      if (queryParams.search) params.append('search', queryParams.search);
      if (queryParams.tier) params.append('tier', queryParams.tier);
      if (queryParams.theme) params.append('theme', queryParams.theme);
      if (queryParams.time) params.append('time', queryParams.time);
      if (queryParams.priceSort) params.append('priceSort', queryParams.priceSort);
      if (queryParams.priceMin) params.append('priceMin', queryParams.priceMin);
      if (queryParams.priceMax) params.append('priceMax', queryParams.priceMax);
      if (queryParams.page) params.append('page', queryParams.page);
      if (queryParams.limit) params.append('limit', queryParams.limit);

      const response = await fetch(`http://localhost:5005/api/products?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

      // If loading more, append new items to existing ones
      setProducts(prevProducts => isLoadMore ? [...prevProducts, ...data.data] : data.data);
      setPagination({
        page: data.pagination.page,
        limit: data.pagination.limit,
        total: data.pagination.total,
        hasMore: data.pagination.hasMore
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  }, [queryParams]);

  // Initial fetch and handle query param changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters: FilterParams) => {
    setQueryParams({
      search: newFilters.search,
      tier: newFilters.tier,
      theme: newFilters.theme,
      time: newFilters.time,
      priceSort: newFilters.priceSort,
      priceMin: newFilters.priceMin?.toString(),
      priceMax: newFilters.priceMax?.toString(),
      page: '1', // Reset to first page when filters change
      limit: newFilters.limit?.toString()
    });
  }, [setQueryParams]);

  const handleCategoryClick = useCallback((category: string) => {
    setQueryParams({
      category: category === 'All' ? undefined : category,
      page: '1' // Reset to first page when changing category
    });
  }, [setQueryParams]);

  const handleLoadMore = useCallback(() => {
    if (pagination.hasMore) {
      const nextPage = pagination.page + 1;
      setQueryParams({
        page: nextPage.toString()
      });
      fetchProducts(true); // Pass true to indicate this is a load more operation
    }
  }, [pagination, setQueryParams, fetchProducts]);

  const getCategoryTagClass = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Epic': styles.categoryTagEpic,
      'Mythic': styles.categoryTagMythic,
      'Common': styles.categoryTagCommon,
      'Rare': styles.categoryTagRare,
      'Legendary': styles.categoryTagLegendary,
    };
    return categoryMap[category] || styles.categoryTag;
  };

  return (
    <Layout className={styles.container}>
      <Layout>
        <Sider width={300} className={styles.sidebarFilter}>
          <NFTFilter
            onFilterChange={handleFilterChange}
            loading={loading}
          />
        </Sider>

        <Content>
          <div className={styles.marketplaceContainer}>
            <CategoryTabs
              categories={categories}
              selectedCategory={queryParams.category || 'All'}
              onCategoryClick={handleCategoryClick}
            />
          </div>
          <div className={styles.nftGrid}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <Spin size="large" />
              </div>
            ) : (
              <>
                {products.map((product) => (
                  <NFTCard
                    key={product.id}
                    {...product}
                    getCategoryTagClass={getCategoryTagClass}
                  />
                ))}
                {loadingMore && (
                  <div className={styles.loadingMoreContainer}>
                    <Spin size="large" />
                  </div>
                )}
              </>
            )}
          </div>

          {pagination.hasMore && !loadingMore && (
            <div className={styles.viewMoreContainer}>
              <button
                className={styles.viewMoreButton}
                onClick={handleLoadMore}
                disabled={loading || loadingMore}
              >
                View more
              </button>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default NFTMarketplace; 