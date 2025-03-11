import React, { useState, useCallback } from 'react';
import { Select, Slider, Space, Typography, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

export interface FilterParams {
  search?: string;
  tier?: string;
  theme?: string;
  time?: 'Lastest' | 'Oldest';
  priceSort?: 'asc' | 'desc';
  priceMin?: number;
  priceMax?: number;
  page?: number;
  limit?: number;
}

interface NFTFilterProps {
  onFilterChange: (filters: FilterParams) => void;
  loading?: boolean;
}

const NFTFilter: React.FC<NFTFilterProps> = ({
  onFilterChange,
  loading = false
}) => {
  // State for all filters
  const [filters, setFilters] = useState<FilterParams>({
    search: '',
    tier: undefined,
    theme: undefined,
    time: 'Lastest',
    priceSort: 'asc',
    priceMin: 0.01,
    priceMax: 200,
    page: 1,
    limit: 8
  });

  // Handler for updating filters
  const updateFilters = useCallback((key: keyof FilterParams, value: any) => {
    const newFilters = { ...filters, [key]: value, page: 1 }; // Reset page when filters change
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [filters, onFilterChange]);

  // Handle price range change
  const handlePriceRangeChange = useCallback((value: number[]) => {
    updateFilters('priceMin', value[0]);
    updateFilters('priceMax', value[1]);
  }, [updateFilters]);

  // Handle reset
  const handleReset = useCallback(() => {
    const defaultFilters: FilterParams = {
      search: '',
      tier: undefined,
      theme: undefined,
      time: 'Lastest',
      priceSort: 'asc',
      priceMin: 0.01,
      priceMax: 200,
      page: 1,
      limit: 8
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  }, [onFilterChange]);

  return (
    <div className={styles.filterContainer}>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Quick search"
        className={styles.searchInput}
        value={filters.search}
        onChange={(e) => updateFilters('search', e.target.value)}
      />

      <div className={styles.filterSection}>
        <Typography.Text className={styles.filterLabel}>PRICE</Typography.Text>
        <Slider
          range
          min={0.01}
          max={200}
          step={0.01}
          value={[filters.priceMin || 0.01, filters.priceMax || 200]}
          onChange={handlePriceRangeChange}
          tooltip={{
            formatter: (value) => `${value} ETH`
          }}
          className={styles.priceSlider}
        />
        <div className={styles.priceRange}>
          <span>{filters.priceMin} ETH</span>
          <span>{filters.priceMax} ETH</span>
        </div>
      </div>

      <div className={styles.filterSection}>
        <Typography.Text className={styles.filterLabel}>TIER</Typography.Text>
        <Select
          value={filters.tier}
          className={styles.filterSelect}
          onChange={(value) => updateFilters('tier', value)}
          options={[
            { label: 'All', value: undefined },
            { label: 'Basic', value: 'Basic' },
            { label: 'Premium', value: 'Premium' },
            { label: 'Deluxe', value: 'Deluxe' },
          ]}
        />
      </div>

      <div className={styles.filterSection}>
        <Typography.Text className={styles.filterLabel}>THEME</Typography.Text>
        <Select
          value={filters.theme}
          className={styles.filterSelect}
          onChange={(value) => updateFilters('theme', value)}
          options={[
            { label: 'All', value: undefined },
            { label: 'Halloween', value: 'Halloween' },
            { label: 'Colorful', value: 'Colorful' },
            { label: 'Dark', value: 'Dark' },
            { label: 'Light', value: 'Light' },
          ]}
        />
      </div>

      <div className={styles.filterSection}>
        <Typography.Text className={styles.filterLabel}>TIME</Typography.Text>
        <Select
          value={filters.time}
          className={styles.filterSelect}
          onChange={(value) => updateFilters('time', value)}
          options={[
            { label: 'Latest', value: 'Lastest' },
            { label: 'Oldest', value: 'Oldest' },
          ]}
        />
      </div>

      <div className={styles.filterSection}>
        <Typography.Text className={styles.filterLabel}>PRICE</Typography.Text>
        <Select
          value={filters.priceSort}
          className={styles.filterSelect}
          onChange={(value) => updateFilters('priceSort', value)}
          options={[
            { label: 'Low to high', value: 'asc' },
            { label: 'High to low', value: 'desc' },
          ]}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button 
          icon={<>×</>}
          onClick={handleReset}
          className={styles.resetButton}
          disabled={loading}
        >
          Reset filter
        </Button>
        <Button 
          type="primary"
          onClick={() => onFilterChange(filters)}
          className={styles.searchButton}
          loading={loading}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default NFTFilter; 