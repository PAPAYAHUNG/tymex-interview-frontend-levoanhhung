import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import NFTCard from './index';

// Mock the CSS module
vi.mock('./styles.module.scss', () => ({
  default: {
    nftCard: 'nftCard',
    imageContainer: 'imageContainer',
    cardImageContainer: 'cardImageContainer',
    cardImage: 'cardImage',
    favoriteButton: 'favoriteButton',
    cardContent: 'cardContent',
    cardHeader: 'cardHeader',
    cardTitle: 'cardTitle',
    price: 'price',
    cardFooter: 'cardFooter',
    authorInfo: 'authorInfo',
    authorName: 'authorName'
  }
}));

// Mock Ant Design components
vi.mock('antd', () => ({
  Avatar: ({ src, size }: { src: string; size: string }) => (
    <img src={src} data-testid="avatar" data-size={size} alt="avatar" />
  ),
  Tooltip: ({ children, title }: { children: React.ReactNode; title: string }) => (
    <div data-tooltip={title}>{children}</div>
  )
}));

// Mock Ant Design icons
vi.mock('@ant-design/icons', () => ({
  HeartOutlined: () => <div data-testid="heart-outlined" />,
  HeartFilled: () => <div data-testid="heart-filled" />
}));

describe('NFTCard', () => {
  const mockProps = {
    id: '1',
    title: 'Test NFT',
    price: 1.5,
    category: 'Upper Body',
    imageId: '123',
    isFavorite: false,
    author: {
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://example.com/avatar.jpg'
    },
    getCategoryTagClass: (category: string) => `category-${category.toLowerCase()}`
  };

  it('renders NFT card with correct props', () => {
    render(<NFTCard {...mockProps} />);
    
    // Check if title is rendered
    expect(screen.getByText('Test NFT')).toBeInTheDocument();
    
    // Check if price is rendered
    expect(screen.getByText('1.5 ETH')).toBeInTheDocument();
    
    // Check if category is rendered
    expect(screen.getByText('Upper Body')).toBeInTheDocument();
    
    // Check if author name is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('displays favorite icon correctly', () => {
    const { rerender } = render(<NFTCard {...mockProps} />);
    expect(screen.getByTestId('heart-outlined')).toBeInTheDocument();
    
    // Rerender with isFavorite true
    rerender(<NFTCard {...mockProps} isFavorite={true} />);
    expect(screen.getByTestId('heart-filled')).toBeInTheDocument();
  });

  it('applies correct category tag class', () => {
    render(<NFTCard {...mockProps} />);
    const categoryTag = screen.getByText('Upper Body');
    expect(categoryTag).toHaveClass('category-upper body');
  });
}); 