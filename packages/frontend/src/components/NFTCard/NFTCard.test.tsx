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
  HeartOutlined: () => <img alt="heart-outlined" />,
  HeartFilled: () => <img alt="heart-filled" />
}));

describe('NFTCard', () => {
  const mockProps = {
    id: '1',
    title: 'Cool NFT',
    price: 1.5,
    category: 'Art',
    imageId: '123',
    isFavorite: false,
    author: {
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://example.com/avatar.jpg'
    },
    getCategoryTagClass: (category: string) => `category-${category.toLowerCase()}`
  };

  it('renders NFT card with correct information', () => {
    render(<NFTCard {...mockProps} />);
    
    // Check if title is rendered
    expect(screen.getByText('Cool NFT')).toBeInTheDocument();
    
    // Check if price is rendered
    expect(screen.getByText('1.5 ETH')).toBeInTheDocument();
    
    // Check if category is rendered
    expect(screen.getByText('Art')).toBeInTheDocument();
    
    // Check if author name is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check if image is rendered with correct src
    const image = screen.getByAltText('Cool NFT') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://picsum.photos/seed/123/300/300');
  });

  it('renders heart icon based on favorite status', () => {
    const { rerender } = render(<NFTCard {...mockProps} />);
    expect(screen.getByAltText('heart-outlined')).toBeInTheDocument();

    rerender(<NFTCard {...mockProps} isFavorite={true} />);
    expect(screen.getByAltText('heart-filled')).toBeInTheDocument();
  });

  it('applies correct category class', () => {
    render(<NFTCard {...mockProps} />);
    const categoryElement = screen.getByText('Art');
    expect(categoryElement.className).toBe('category-art');
  });
}); 