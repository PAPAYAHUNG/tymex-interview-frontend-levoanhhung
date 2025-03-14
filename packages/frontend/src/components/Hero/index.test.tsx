import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './index';
import styles from './styles.module.scss';

// Mock the image imports
vi.mock('../../assets/characters/author/1.png', () => ({ default: 'hero1.png' }));
vi.mock('../../assets/characters/author/2.png', () => ({ default: 'hero2.png' }));
vi.mock('../../assets/characters/author/3.png', () => ({ default: 'hero3.png' }));
vi.mock('../../assets/characters/author/4.png', () => ({ default: 'hero4.png' }));
vi.mock('../../assets/characters/section2.png', () => ({ default: 'neonGuy.png' }));
vi.mock('../../assets/characters/section3.png', () => ({ default: 'section3.png' }));
vi.mock('../../assets/characters/bgImage.jpeg', () => ({ default: 'bgImage.jpeg' }));
vi.mock('../../assets/characters/horizontalSection.png', () => ({ default: 'horizontalSection.png' }));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('Hero', () => {
  it('renders all hero cards', () => {
    render(<Hero />);

    // Check if all hero names are rendered
    expect(screen.getByText('ASSASISIN')).toBeInTheDocument();
    expect(screen.getByText('NEON GUY')).toBeInTheDocument();
    expect(screen.getByText('MAFIA ENGLAND')).toBeInTheDocument();
    expect(screen.getByText('BASKETBALL GIRL')).toBeInTheDocument();
  });

  it('renders all hero images', () => {
    render(<Hero />);

    // Check if all hero images are rendered
    const heroImages = screen.getAllByRole('img');
    expect(heroImages).toHaveLength(7); // 4 hero images + bgImage + section3Img + neonGuyImg
  });

  it('renders with correct section classes', () => {
    render(<Hero />);

    // Check if main sections are rendered with correct classes
    expect(screen.getByRole('region')).toHaveClass(styles.heroSection);
    expect(screen.getByTestId('hero-content')).toHaveClass(styles.heroContent);
    expect(screen.getByTestId('character-grid')).toHaveClass(styles.characterGrid);
  });

  it('renders hero cards with correct structure', () => {
    render(<Hero />);

    // Check if hero cards have correct structure
    const heroCards = screen.getAllByTestId('hero-card');
    expect(heroCards).toHaveLength(4);

    heroCards.forEach((card, index) => {
      expect(card).toHaveClass(styles.heroCard);
      expect(card.querySelector('img')).toBeInTheDocument();
      expect(card.querySelector(`.${styles.heroCardText}`)).toBeInTheDocument();
    });
  });
}); 