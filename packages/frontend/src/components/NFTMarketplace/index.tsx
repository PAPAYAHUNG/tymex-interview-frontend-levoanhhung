import React from 'react';
import { Layout, Avatar} from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import styles from './styles.module.css';
import NFTFilter from '../NFTFilter';

const { Sider, Content } = Layout;

const categories = ['All', 'Upper Body', 'Lower Body', 'Hat', 'Shoes', 'Accessory', 'Legendary', 'Mythic', 'Epic', 'Rare'];

const mockData = [
  {
    id: 1,
    title: "The DJ",
    category: "Epic",
    price: 2.75,
    image: "path_to_dj_image",
    isFavorite: false,
    author: {
      name: "Ghozali_Ghozalu",
      avatar: "path_to_avatar"
    }
  },
];

const NFTMarketplace: React.FC = () => {
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
      <div className={styles.categoryTabs}>
        {categories.map((category) => (
          <button
            key={category}
            className={category === 'All' ? styles.categoryButtonActive : styles.categoryButton}
          >
            {category}
          </button>
        ))}
      </div>

      <Layout style={{ background: '#141414' }}>
        <Sider width={300} className={styles.sidebarFilter}>
          <NFTFilter />
        </Sider>

        <Content>
          <div className={styles.nftGrid}>
            {mockData.map((item) => (
              <div key={item.id} className={styles.nftCard}>
                <div className={styles.cardImageContainer}>
                  <img
                    className={styles.cardImage}
                    src={`https://picsum.photos/300/300?random=${item.id}`}
                    alt={item.title}
                  />
                  <span className={getCategoryTagClass(item.category)}>
                    {item.category}
                  </span>
                  <span className={styles.favoriteButton}>
                    {item.isFavorite ? <HeartFilled /> : <HeartOutlined />}
                  </span>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>{item.title}</div>
                  <div className={styles.cardFooter}>
                    <div className={styles.authorInfo}>
                      <Avatar size="small" src={item.author.avatar} />
                      <span className={styles.authorName}>{item.author.name}</span>
                    </div>
                    <span className={styles.price}>{item.price} ETH</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.viewMoreContainer}>
            <button className={styles.viewMoreButton}>
              View more
            </button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NFTMarketplace; 