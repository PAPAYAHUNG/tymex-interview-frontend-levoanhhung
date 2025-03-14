import React from 'react';
import styles from './styles.module.scss';

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onCategoryClick,
}) => {
  return (
    <div className={styles.categoryTabs}>
      {categories.map((category) => (
        <button
          key={category}
          className={
            category === selectedCategory
              ? styles.categoryButtonActive
              : styles.categoryButton
          }
          onClick={() => onCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}; 