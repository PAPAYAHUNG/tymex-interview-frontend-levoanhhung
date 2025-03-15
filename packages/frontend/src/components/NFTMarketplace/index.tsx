import React, { useState, useCallback, useEffect } from 'react';
import { Layout, Spin, Empty } from 'antd';
import { useQueryParams, StringParam } from 'use-query-params';
import styles from './styles.module.scss';
import NFTFilter, { FilterParams } from '../NFTFilter';
import NFTCard from '../NFTCard';
import { CategoryTabs } from '../CategoryTabs';
import { useProducts } from '@/hooks/useProducts';

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
  const [queryParams, setQueryParams] = useQueryParams(queryConfig);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 8,
    total: 0,
    hasMore: false
  });

  const { data, isLoading, isFetching, fetchNextPage } = useProducts({
    category: queryParams.category || undefined,
    search: queryParams.search || undefined,
    tier: queryParams.tier || undefined,
    theme: queryParams.theme || undefined,
    _sort: queryParams.priceSort ? 'price' : undefined,
    _order: queryParams.priceSort as 'asc' | 'desc' | undefined,
    priceMin: queryParams.priceMin ? Number(queryParams.priceMin) : undefined,
    priceMax: queryParams.priceMax ? Number(queryParams.priceMax) : undefined,
    _page: queryParams.page ? Number(queryParams.page) : undefined,
    _limit: queryParams.limit ? Number(queryParams.limit) : undefined,
  });

  // Flatten all pages of products
  const products = data?.pages.flatMap(page => page.data) || [];
  const loading = isLoading;
  const loadingMore = isFetching && !isLoading;

  // Update pagination when data changes
  useEffect(() => {
    if (data?.pages[data.pages.length - 1]?.pagination) {
      setPagination(data.pages[data.pages.length - 1].pagination);
    }
  }, [data?.pages]);

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
      fetchNextPage();
    }
  }, [pagination.hasMore, fetchNextPage]);

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
            ) : products.length === 0 ? (
              <div className={styles.noDataContainer}>
                <Empty
                  description="No NFTs found"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  imageStyle={{ height: 60 }}
                />
              </div>
            ) : (
              <>
                {products.map((product) => (
                  <NFTCard
                    key={product.id}
                    {...product}
                    id={String(product.id)}
                    imageId={String(product.imageId)}
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

          {pagination.hasMore && !loadingMore && products.length > 0 && (
            <div className={styles.viewMoreContainer}>
              <button
                className={styles.viewMoreButton}
                onClick={handleLoadMore}
              >
                View More
              </button>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default NFTMarketplace; 