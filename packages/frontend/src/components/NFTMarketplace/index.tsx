import React, { useState, useCallback, useEffect } from 'react';
import { Layout, Avatar, Input, Spin } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
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

const NFTMarketplace: React.FC = () => {
  const [products, setProducts] = useState<NFTProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 8,
    total: 0,
    hasMore: false
  });

  // Function to build query string from filters
  const buildQueryString = (filters: FilterParams): string => {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.tier) params.append('tier', filters.tier);
    if (filters.theme) params.append('theme', filters.theme);
    if (filters.priceMin !== undefined) params.append('priceMin', filters.priceMin.toString());
    if (filters.priceMax !== undefined) params.append('priceMax', filters.priceMax.toString());
    
    // Add category to query if not 'All'
    if (selectedCategory !== 'All') {
      params.append('category', selectedCategory);
    }
    
    // Handle time sorting
    if (filters.time === 'Oldest') {
      params.append('_sort', 'createdAt');
      params.append('_order', 'asc');
    } else {
      params.append('_sort', 'createdAt');
      params.append('_order', 'desc');
    }
    
    // Handle price sorting if time sort is not applied
    if (filters.priceSort) {
      if (!filters.time) {
        params.append('_sort', 'price');
        params.append('_order', filters.priceSort);
      }
    }
    
    params.append('_page', (filters.page || 1).toString());
    params.append('_limit', (filters.limit || 8).toString());
    
    return params.toString();
  };

  // Function to fetch products
  const fetchProducts = useCallback(async (filters: FilterParams) => {
    try {
      setLoading(true);
      const queryString = buildQueryString(filters);
      const response = await fetch(`http://localhost:5005/api/products?${queryString}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      
      setProducts(data.data);
      setPagination({
        page: data.pagination.page,
        limit: data.pagination.limit,
        total: data.pagination.total,
        hasMore: data.pagination.hasMore
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters: FilterParams) => {
    fetchProducts(newFilters);
  }, [fetchProducts]);

  // Initial fetch
  useEffect(() => {
    const initialFilters: FilterParams = {
      page: 1,
      limit: 8,
      time: 'Lastest',
      priceSort: 'asc',
      priceMin: 0.01,
      priceMax: 200
    };
    fetchProducts(initialFilters);
  }, [fetchProducts]);

  const handleCategoryClick = useCallback((category: string) => {
    setSelectedCategory(category);
    const filters: FilterParams = {
      page: 1,
      limit: 8,
      time: 'Lastest',
      priceSort: 'asc',
      priceMin: 0.01,
      priceMax: 200
    };
    fetchProducts(filters);
  }, [fetchProducts]);

  const handleLoadMore = useCallback(() => {
    if (pagination.hasMore) {
      const nextPage = pagination.page + 1;
      const filters: FilterParams = {
        page: nextPage,
        limit: pagination.limit,
        time: 'Lastest',
        priceSort: 'asc',
        priceMin: 0.01,
        priceMax: 200
      };
      fetchProducts(filters);
    }
  }, [pagination, fetchProducts]);

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
      <Sider width={300} className={styles.sidebarFilter}>
        <NFTFilter
          onFilterChange={handleFilterChange}
          loading={loading}
        />
      </Sider>

      <Layout>
        <div className={styles.marketplaceContainer}>
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
        </div>

        <Content>
          <div className={styles.nftGrid}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <Spin size="large" />
              </div>
            ) : (
              products.map((product) => (
                <NFTCard
                  key={product.id}
                  {...product}
                  getCategoryTagClass={getCategoryTagClass}
                />
              ))
            )}
          </div>

          {pagination.hasMore && (
            <div className={styles.viewMoreContainer}>
              <button
                className={styles.viewMoreButton}
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'View more'}
              </button>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default NFTMarketplace; 