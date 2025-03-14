import React from 'react';
import { Avatar } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import styles from './styles.module.scss';

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
            <div className={styles.cardImageContainer}>
                <img
                    className={styles.cardImage}
                    src={`https://picsum.photos/seed/${imageId}/300/300`}
                    alt={title}
                />
                <span className={getCategoryTagClass(category)}>
                    {category}
                </span>
                <span className={styles.favoriteButton}>
                    {isFavorite ? <HeartFilled /> : <HeartOutlined />}
                </span>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>{title}</div>
                    <div className={styles.price}>{price} ETH</div>
                </div>
                <div className={styles.cardFooter}>
                    <div className={styles.authorInfo}>
                        <Avatar size="small" src={author.avatar} />
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