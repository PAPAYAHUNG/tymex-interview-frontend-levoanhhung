import React, { useState, useCallback, useEffect } from 'react';
import { Select, Slider, Typography, Input, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
import styles from './styles.module.scss';
import { DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_PRICE_MAX, DEFAULT_PRICE_MIN } from '@/constants';
import { useQueryParams, StringParam, NumberParam } from 'use-query-params';

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

const queryConfig = {
  search: StringParam,
  tier: StringParam,
  theme: StringParam,
  time: StringParam,
  priceSort: StringParam,
  priceMin: NumberParam,
  priceMax: NumberParam,
  page: NumberParam,
  limit: NumberParam,
} as const;

const NFTFilter: React.FC<NFTFilterProps> = ({
  onFilterChange,
  loading = false
}) => {
  const [search, setSearch] = useState('');
  const [queryParams, setQueryParams] = useQueryParams(queryConfig);
  const [filters, setFilters] = useState<FilterParams>({
    tier: queryParams.tier || undefined,
    theme: queryParams.theme || undefined,
    time: (queryParams.time as 'Lastest' | 'Oldest') || 'Lastest',
    priceSort: (queryParams.priceSort as 'asc' | 'desc') || 'asc',
    priceMin: queryParams.priceMin || DEFAULT_PRICE_MIN,
    priceMax: queryParams.priceMax || DEFAULT_PRICE_MAX,
    page: queryParams.page || DEFAULT_PAGE,
    limit: queryParams.limit || DEFAULT_LIMIT
  });

  // Initialize search from query params
  useEffect(() => {
    if (queryParams.search) {
      setSearch(queryParams.search);
    }
  }, [queryParams.search]);

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      const newFilters = { ...filters, search: searchValue, page: DEFAULT_PAGE };
      setQueryParams({
        ...queryParams,
        search: searchValue,
        page: DEFAULT_PAGE
      });
      onFilterChange(newFilters);
    }, 300),
    [filters, onFilterChange, setQueryParams, queryParams]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  const updateFilters = useCallback((key: keyof FilterParams, value: any) => {
    const newFilters = { ...filters, [key]: value, page: DEFAULT_PAGE };
    setFilters(newFilters);
    setQueryParams({
      ...queryParams,
      [key]: value,
      page: DEFAULT_PAGE
    });
    onFilterChange(newFilters);
  }, [filters, onFilterChange, setQueryParams, queryParams]);

  const handlePriceRangeChange = useCallback((value: number[]) => {
    // Update visual state immediately
    setFilters(prev => ({
      ...prev,
      priceMin: value[0],
      priceMax: value[1],
    }));
  }, []);

  const handlePriceRangeAfterChange = useCallback((value: number[]) => {
    const newFilters = {
      ...filters,
      priceMin: value[0],
      priceMax: value[1],
      page: DEFAULT_PAGE
    };
    setQueryParams({
      ...queryParams,
      priceMin: value[0],
      priceMax: value[1],
      page: DEFAULT_PAGE
    });
    onFilterChange(newFilters);
  }, [filters, onFilterChange, setQueryParams, queryParams]);

  const handleReset = useCallback(() => {
    setSearch('');
    const defaultFilters: FilterParams = {
      tier: undefined,
      theme: undefined,
      time: 'Lastest',
      priceSort: 'asc',
      priceMin: DEFAULT_PRICE_MIN,
      priceMax: DEFAULT_PRICE_MAX,
      page: DEFAULT_PAGE,
      limit: DEFAULT_LIMIT
    };
    setFilters(defaultFilters);
    setQueryParams(defaultFilters);
    onFilterChange(defaultFilters);
  }, [onFilterChange, setQueryParams]);

  const handleSearch = useCallback(() => {
    const newFilters = { ...filters, search, page: DEFAULT_PAGE };
    setQueryParams({
      ...queryParams,
      search,
      page: DEFAULT_PAGE
    });
    onFilterChange(newFilters);
  }, [filters, search, onFilterChange, setQueryParams, queryParams]);

  return (
    <div className={styles.filterContainer}>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Quick search"
        className={styles.searchInput}
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        allowClear
      />

      <div className={styles.filterSection}>
        <Typography.Text className={styles.filterLabel}>PRICE</Typography.Text>
        <Slider
          range
          min={DEFAULT_PRICE_MIN}
          max={DEFAULT_PRICE_MAX}
          step={0.01}
          value={[filters.priceMin || DEFAULT_PRICE_MIN, filters.priceMax || DEFAULT_PRICE_MAX]}
          onChange={handlePriceRangeChange}
          onAfterChange={handlePriceRangeAfterChange}
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
          showSearch
          optionLabelProp="label"
          dropdownRender={(menu) => (
            <Tooltip title={filters.tier} open={!!filters.tier}>
              {menu}
            </Tooltip>
          )}
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
          showSearch
          optionLabelProp="label"
          dropdownRender={(menu) => (
            <Tooltip title={filters.theme} open={!!filters.theme}>
              {menu}
            </Tooltip>
          )}
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
          showSearch
          optionLabelProp="label"
          dropdownRender={(menu) => (
            <Tooltip title={filters.time}>
              {menu}
            </Tooltip>
          )}
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
          onClick={handleSearch}
          className={styles.searchButton}
          loading={loading}
        >
          Apply filters
        </Button>
      </div>
    </div>
  );
};

export default NFTFilter; 