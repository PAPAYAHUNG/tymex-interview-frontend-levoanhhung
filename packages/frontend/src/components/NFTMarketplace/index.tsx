import React, { useState } from 'react';
import { Layout, Avatar, Input, Spin, Typography } from 'antd';
import { HeartOutlined, HeartFilled, SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.css';
import NFTFilter from '../NFTFilter';
import { useProducts } from '@/hooks/useProducts';
import { PaginationParams, Product } from '@/types/api';

const { Sider, Content } = Layout;

const categories = ['All', 'Upper Body', 'Lower Body', 'Hat', 'Shoes', 'Accessory', 'Legendary', 'Mythic', 'Epic', 'Rare'];

const NFTMarketplace: React.FC = () => {
  const [searchParams, setSearchParams] = useState<PaginationParams>({
    _page: 1,
    _limit: 12,
    search: '',
    category: undefined,
    tier: undefined,
    theme: undefined,
    priceMin: undefined,
    priceMax: undefined,
    _sort: 'price',
    _order: 'asc',
  });

  const { data, isLoading, error } = useProducts(searchParams);

  const handleSearch = (value: string) => {
    setSearchParams(prev => ({ ...prev, search: value, _page: 1 }));
  };

  const handleCategoryClick = (category: string) => {
    setSearchParams(prev => ({
      ...prev,
      category: category === 'All' ? undefined : category,
      _page: 1,
    }));
  };

  const handleTierChange = (value: string | undefined) => {
    setSearchParams(prev => ({ ...prev, tier: value, _page: 1 }));
  };

  const handleThemeChange = (value: string | undefined) => {
    setSearchParams(prev => ({ ...prev, theme: value, _page: 1 }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    setSearchParams(prev => ({
      ...prev,
      priceMin: value[0],
      priceMax: value[1],
      _page: 1,
    }));
  };

  const handleLoadMore = () => {
    if (data?.pagination.hasMore) {
      setSearchParams(prev => ({
        ...prev,
        _page: (prev._page || 1) + 1,
      }));
    }
  };

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

  if (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <Typography.Text type="danger">Error loading products</Typography.Text>
      </div>
    );
  }

  return (
    <Layout className={styles.container}>
      <Layout style={{ background: '#141414' }}>
        <Sider width={300} className={styles.sidebarFilter}>
          <NFTFilter
            onTierChange={handleTierChange}
            onThemeChange={handleThemeChange}
            onPriceRangeChange={handlePriceRangeChange}
          />
        </Sider>

        <Content>
          <div className={styles.categoryTabs}>
            {categories.map((category) => (
              <button
                key={category}
                className={
                  category === (searchParams.category || 'All')
                    ? styles.categoryButtonActive
                    : styles.categoryButton
                }
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.nftGrid}>
            {isLoading && !data?.data.length ? (
              <div className={styles.loadingContainer}>
                <Spin size="large" />
              </div>
            ) : (
              data?.data.map((product: Product) => (
                <div key={product.id} className={styles.nftCard}>
                  <div className={styles.cardImageContainer}>
                    <img
                      className={styles.cardImage}
                      src={`https://picsum.photos/seed/${product.imageId}/300/300`}
                      alt={product.title}
                    />
                    <span className={getCategoryTagClass(product.category)}>
                      {product.category}
                    </span>
                    <span className={styles.favoriteButton}>
                      {product.isFavorite ? <HeartFilled /> : <HeartOutlined />}
                    </span>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardTitle}>{product.title}</div>
                    <div className={styles.cardFooter}>
                      <div className={styles.authorInfo}>
                        <Avatar size="small" src={product.author.avatar} />
                        <span className={styles.authorName}>
                          {`${product.author.firstName} ${product.author.lastName}`}
                        </span>
                      </div>
                      <span className={styles.price}>{product.price} ETH</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {data?.pagination.hasMore && (
            <div className={styles.viewMoreContainer}>
              <button
                className={styles.viewMoreButton}
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'View more'}
              </button>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default NFTMarketplace; 