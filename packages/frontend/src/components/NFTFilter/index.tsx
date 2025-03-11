import React, { useState } from 'react';
import { Select, Slider, Space, Typography, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

interface NFTFilterProps {
  onTierChange: (value: string | undefined) => void;
  onThemeChange: (value: string | undefined) => void;
  onTimeChange: (value: string | undefined) => void;
  onPriceRangeChange: (value: number[]) => void;
  onSearch: (value: string) => void;
  onReset: () => void;
}

const NFTFilter: React.FC<NFTFilterProps> = ({
  onTierChange,
  onThemeChange,
  onTimeChange,
  onPriceRangeChange,
  onSearch,
  onReset,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.filterContainer}>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Quick search"
        className={styles.searchInput}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className={styles.filterSection}>
        <Typography.Text className={styles.filterLabel}>PRICE</Typography.Text>
        <Slider
          range
          min={0.01}
          max={200}
          step={0.01}
          defaultValue={[0.01, 200]}
          onChange={onPriceRangeChange}
          tooltip={{
            formatter: (value) => `${value} ETH`
          }}
          className={styles.priceSlider}
        />
        <div className={styles.priceRange}>
          <span>0.01 ETH</span>
          <span>200 ETH</span>
        </div>
      </div>

      <div className={styles.filterSection}>
        <Typography.Text className={styles.filterLabel}>TIER</Typography.Text>
        <Select
          defaultValue="All"
          className={styles.filterSelect}
          onChange={onTierChange}
          options={[
            { label: 'All', value: 'All' },
            { label: 'Basic', value: 'Basic' },
            { label: 'Premium', value: 'Premium' },
            { label: 'Deluxe', value: 'Deluxe' },
          ]}
        />
      </div>

      <div className={styles.filterSection}>
        <Typography.Text className={styles.filterLabel}>THEME</Typography.Text>
        <Select
          defaultValue="Halloween"
          className={styles.filterSelect}
          onChange={onThemeChange}
          options={[
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
          defaultValue="Lastest"
          className={styles.filterSelect}
          onChange={onTimeChange}
          options={[
            { label: 'Lastest', value: 'Lastest' },
            { label: 'Oldest', value: 'Oldest' },
          ]}
        />
      </div>

      <div className={styles.filterSection}>
        <Typography.Text className={styles.filterLabel}>PRICE</Typography.Text>
        <Select
          defaultValue="Low to high"
          className={styles.filterSelect}
          options={[
            { label: 'Low to high', value: 'asc' },
            { label: 'High to low', value: 'desc' },
          ]}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button 
          icon={<>×</>}
          onClick={onReset}
          className={styles.resetButton}
        >
          Reset filter
        </Button>
        <Button 
          type="primary"
          onClick={() => onSearch(searchQuery)}
          className={styles.searchButton}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default NFTFilter; 