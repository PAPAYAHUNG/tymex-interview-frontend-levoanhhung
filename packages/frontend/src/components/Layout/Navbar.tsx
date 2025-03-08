import React from 'react';
import { Input, Button, Space, Avatar } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <h1 className={styles.logo}>MarketPlace</h1>
      </div>
      
      <div className={styles.navbarCenter}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Quick search"
          className={styles.searchInput}
        />
        <div className={styles.filterTags}>
          <Button type="text" className={styles.filterTag}>Super Rare</Button>
          <Button type="text" className={styles.filterTag}>Live Drop</Button>
          <Button type="text" className={styles.filterTag}>Epic</Button>
          <Button type="text" className={styles.filterTag}>Rare</Button>
          <Button type="text" className={styles.filterTag}>Legendary</Button>
          <Button type="text" className={styles.filterTag}>Mythic</Button>
          <Button type="text" className={styles.filterTag}>Epic</Button>
          <Button type="text" className={styles.filterTag}>Rare</Button>
        </div>
      </div>

      <div className={styles.navbarRight}>
        <Space size="large">
          <Button type="primary" className={styles.connectButton}>
            Connect Wallet
          </Button>
          <Avatar icon={<UserOutlined />} className={styles.avatar} />
        </Space>
      </div>
    </nav>
  );
};

export default Navbar; 