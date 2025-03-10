import React from 'react';
// import Hero from '../components/Hero';
import NFTMarketplace from '../components/NFTMarketplace';
import { Layout } from 'antd';
import Hero from '@/components/Hero';

const { Content } = Layout;

const Home: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#141414' }}>
      <Content>
        <Hero />
        <NFTMarketplace />
      </Content>
    </Layout>
  );
};

export default Home; 