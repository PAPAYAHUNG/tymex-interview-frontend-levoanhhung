import React from 'react';
import { Input, Select, Slider, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const { Option } = Select;

interface NFTFilterProps {
  onTierChange: (value: string | undefined) => void;
  onThemeChange: (value: string | undefined) => void;
  onPriceRangeChange: (value: number[]) => void;
}

const NFTFilter: React.FC<NFTFilterProps> = ({
  onTierChange,
  onThemeChange,
  onPriceRangeChange,
}) => {
  return (
    <div className={styles.filterContainer}>
      <Typography.Title level={4}>Filters</Typography.Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Typography.Text strong>Tier</Typography.Text>
          <Select
            placeholder="Select Tier"
            style={{ width: '100%', marginTop: 8 }}
            allowClear
            onChange={onTierChange}
            options={[
              { label: 'Basic', value: 'Basic' },
              { label: 'Premium', value: 'Premium' },
              { label: 'Deluxe', value: 'Deluxe' },
            ]}
          />
        </div>

        <div>
          <Typography.Text strong>Theme</Typography.Text>
          <Select
            placeholder="Select Theme"
            style={{ width: '100%', marginTop: 8 }}
            allowClear
            onChange={onThemeChange}
            options={[
              { label: 'Colorful', value: 'Colorful' },
              { label: 'Halloween', value: 'Halloween' },
              { label: 'Dark', value: 'Dark' },
              { label: 'Light', value: 'Light' },
            ]}
          />
        </div>

        <div>
          <Typography.Text strong>Price Range (ETH)</Typography.Text>
          <Slider
            range
            min={0}
            max={200}
            defaultValue={[0, 200]}
            onChange={onPriceRangeChange}
            style={{ marginTop: 8 }}
          />
        </div>
      </Space>
    </div>
  );
};

export default NFTFilter; 