import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryTabs } from './index';
import styles from './styles.module.scss';

describe('CategoryTabs', () => {
  const mockCategories = ['Category 1', 'Category 2', 'Category 3'];
  const mockOnCategoryClick = vi.fn();

  it('renders all categories', () => {
    render(
      <CategoryTabs
        categories={mockCategories}
        selectedCategory="Category 1"
        onCategoryClick={mockOnCategoryClick}
      />
    );

    mockCategories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('applies active class to selected category', () => {
    render(
      <CategoryTabs
        categories={mockCategories}
        selectedCategory="Category 2"
        onCategoryClick={mockOnCategoryClick}
      />
    );

    const activeButton = screen.getByText('Category 2');
    expect(activeButton).toHaveClass(styles.categoryButtonActive);
    
    const inactiveButtons = mockCategories
      .filter(cat => cat !== 'Category 2')
      .map(cat => screen.getByText(cat));
    
    inactiveButtons.forEach(button => {
      expect(button).toHaveClass(styles.categoryButton);
    });
  });

  it('calls onCategoryClick with correct category when clicked', () => {
    render(
      <CategoryTabs
        categories={mockCategories}
        selectedCategory="Category 1"
        onCategoryClick={mockOnCategoryClick}
      />
    );

    const categoryButton = screen.getByText('Category 2');
    fireEvent.click(categoryButton);

    expect(mockOnCategoryClick).toHaveBeenCalledTimes(1);
    expect(mockOnCategoryClick).toHaveBeenCalledWith('Category 2');
  });
}); 