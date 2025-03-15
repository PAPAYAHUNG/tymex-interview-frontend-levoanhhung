import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Layout, Spin, Empty } from 'antd';
import { useQueryParams, StringParam } from 'use-query-params';
import styles from './styles.module.scss';
import NFTFilter, { FilterParams } from '../NFTFilter';
import NFTCard from '../NFTCard';
import { CategoryTabs } from '../CategoryTabs';
import { useProducts } from '@/hooks/useProducts';

const { Sider, Content } = Layout;

const categories = ['All', 'Upper Body', 'Lower Body', 'Hat', 'Shoes', 'Accessory', 'Legendary', 'Mythic', 'Epic', 'Rare'];


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
  const products = useMemo(() => data?.pages.flatMap(page => page.data) || [], [data?.pages]);
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

  const getCategoryTagClass = useCallback((category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Epic': styles.categoryTagEpic,
      'Mythic': styles.categoryTagMythic,
      'Common': styles.categoryTagCommon,
      'Rare': styles.categoryTagRare,
      'Legendary': styles.categoryTagLegendary,
    };
    return categoryMap[category] || styles.categoryTag;
  }, []);

  const renderContent = useMemo(() => {
    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className={styles.noDataContainer}>
          <Empty
            description="No NFTs found"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ height: 60 }}
          />
        </div>
      );
    }

    return (
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
    );
  }, [loading, products, loadingMore, getCategoryTagClass]);

  return (
    <Layout className={styles.container}>
      <div className={styles.contentWrapper}>
        <Sider className={styles.sidebarFilter}>
          <NFTFilter
            onFilterChange={handleFilterChange}
            loading={loading}
          />
        </Sider>

        <Content className={styles.mainContent}>
          <div className={styles.marketplaceContainer}>
            <CategoryTabs
              categories={categories}
              selectedCategory={queryParams.category || 'All'}
              onCategoryClick={handleCategoryClick}
            />
          </div>
          <div className={styles.nftGrid}>
            {renderContent}
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
      </div>
    </Layout>
  );
};

export default NFTMarketplace; 