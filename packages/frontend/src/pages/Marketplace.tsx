import { useState } from 'react';
import { Card, Input, Select, Slider, Space, Spin, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useProducts } from '../hooks/useProducts';
import { Product, PaginationParams } from '../types/api';

const { Title } = Typography;
const { Search } = Input;

const Marketplace = () => {
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

  const handleCategoryChange = (value: string | undefined) => {
    setSearchParams(prev => ({ ...prev, category: value, _page: 1 }));
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

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <Typography.Text type="danger">Error loading products</Typography.Text>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Title level={2}>Marketplace</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%', marginBottom: '2rem' }}>
        <Search
          placeholder="Search products"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
        />
        
        <Space wrap>
          <Select
            placeholder="Category"
            allowClear
            style={{ width: 200 }}
            onChange={handleCategoryChange}
            options={[
              { label: 'Accessory', value: 'Accessory' },
              { label: 'Rare', value: 'Rare' },
              { label: 'Lower Body', value: 'Lower Body' },
              { label: 'Shoes', value: 'Shoes' },
              { label: 'Hat', value: 'Hat' },
            ]}
          />
          
          <Select
            placeholder="Tier"
            allowClear
            style={{ width: 200 }}
            onChange={handleTierChange}
            options={[
              { label: 'Basic', value: 'Basic' },
              { label: 'Premium', value: 'Premium' },
              { label: 'Deluxe', value: 'Deluxe' },
            ]}
          />
          
          <Select
            placeholder="Theme"
            allowClear
            style={{ width: 200 }}
            onChange={handleThemeChange}
            options={[
              { label: 'Colorful', value: 'Colorful' },
              { label: 'Halloween', value: 'Halloween' },
              { label: 'Dark', value: 'Dark' },
              { label: 'Light', value: 'Light' },
            ]}
          />
        </Space>

        <div style={{ width: 300 }}>
          <Typography.Text>Price Range</Typography.Text>
          <Slider
            range
            min={0}
            max={200}
            defaultValue={[0, 200]}
            onChange={handlePriceRangeChange}
          />
        </div>
      </Space>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {data?.data.map((product: Product) => (
          <Card
            key={product.id}
            hoverable
            cover={
              <img
                alt={product.title}
                src={`https://picsum.photos/seed/${product.imageId}/400/300`}
                style={{ height: 200, objectFit: 'cover' }}
              />
            }
          >
            <Card.Meta
              title={product.title}
              description={
                <Space direction="vertical">
                  <Typography.Text>Category: {product.category}</Typography.Text>
                  <Typography.Text>Tier: {product.tier}</Typography.Text>
                  <Typography.Text>Theme: {product.theme}</Typography.Text>
                  <Typography.Text>Price: ${product.price}</Typography.Text>
                </Space>
              }
            />
          </Card>
        ))}
      </div>

      {data?.pagination && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Typography.Text>
            Page {data.pagination.page} of {Math.ceil(data.pagination.total / data.pagination.limit)}
          </Typography.Text>
        </div>
      )}
    </div>
  );
};

export default Marketplace; 