import React, { memo } from 'react';
import styles from './styles.module.scss';

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = memo(({
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
});

CategoryTabs.displayName = 'CategoryTabs'; 