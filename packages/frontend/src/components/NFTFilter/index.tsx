import React from 'react';
import { Input, Select, Slider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const { Option } = Select;

const NFTFilter: React.FC = () => {
  return (
    <div className={styles.container}>
      <Input
        className={styles.searchInput}
        prefix={<SearchOutlined />}
        placeholder="Quick search"
      />

      <div className={styles.filterSection}>
        <div className={styles.filterLabel}>PRICE</div>
        <Slider
          className={styles.priceSlider}
          range
          defaultValue={[0.01, 200]}
          min={0.01}
          max={200}
          tipFormatter={(value) => `${value} ETH`}
          marks={{
            0.01: <span className={styles.priceRangeMark}>0.01 ETH</span>,
            200: <span className={styles.priceRangeMark}>200 ETH</span>
          }}
        />
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterLabel}>TIER</div>
        <Select
          className={styles.select}
          defaultValue="all"
          dropdownStyle={{ background: '#1a1a1a' }}
        >
          <Option value="all">All</Option>
        </Select>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterLabel}>THEME</div>
        <Select
          className={styles.select}
          defaultValue="halloween"
          dropdownStyle={{ background: '#1a1a1a' }}
        >
          <Option value="halloween">Halloween</Option>
        </Select>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterLabel}>TIME</div>
        <Select
          className={styles.select}
          defaultValue="lastest"
          dropdownStyle={{ background: '#1a1a1a' }}
        >
          <Option value="lastest">Lastest</Option>
        </Select>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterLabel}>PRICE</div>
        <Select
          className={styles.select}
          defaultValue="low_to_high"
          dropdownStyle={{ background: '#1a1a1a' }}
        >
          <Option value="low_to_high">Low to high</Option>
        </Select>
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.resetButton}>
          Reset filter
        </button>
        <button className={styles.searchButton}>
          Search
        </button>
      </div>
    </div>
  );
};

export default NFTFilter; 