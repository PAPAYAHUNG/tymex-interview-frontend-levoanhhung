import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import styles from './styles.module.scss';
import LazyImage from '../LazyImage/LazyImage';

interface NFTCardProps {
    id: string;
    title: string;
    price: number;
    category: string;
    imageId: string;
    isFavorite: boolean;
    author: {
        firstName: string;
        lastName: string;
        avatar: string;
    };
    getCategoryTagClass: (category: string) => string;
}

const NFTCard: React.FC<NFTCardProps> = ({
    id,
    title,
    price,
    category,
    imageId,
    isFavorite,
    author,
    getCategoryTagClass,
}) => {
    return (
        <div key={id} className={styles.nftCard}>
            <div className={styles.imageContainer}>
                <div className={styles.cardImageContainer}>
                    <LazyImage
                        className={styles.cardImage}
                        src={`https://picsum.photos/seed/${imageId}/300/300`}
                        alt={title}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    <span className={getCategoryTagClass(category)}>
                        {category}
                    </span>
                    <span className={styles.favoriteButton}>
                        {isFavorite ? (
                            <HeartFilled data-testid="heart-filled" style={{ color: '#ff4d4f' }} />
                        ) : (
                            <HeartOutlined data-testid="heart-outlined" />
                        )}
                    </span>
                </div>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <Tooltip title={title}>
                        <div className={styles.cardTitle}>{title}</div>
                    </Tooltip>
                    <div className={styles.price}>{price} ETH</div>
                </div>
                <div className={styles.cardFooter}>
                    <div className={styles.authorInfo}>
                        <Avatar 
                            size="small" 
                            src={author.avatar}
                            icon={<LazyImage 
                                src={author.avatar} 
                                alt={`${author.firstName} ${author.lastName}`} 
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }}
                            />}
                        />
                        <span className={styles.authorName}>
                            {`${author.firstName} ${author.lastName}`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTCard; 