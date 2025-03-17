/// <reference types="vitest" />
import { vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import PageSkeleton from './PageSkeleton';
import '@testing-library/jest-dom';

vi.mock('antd', () => ({
  __esModule: true,
  Skeleton: Object.assign(
    ({ active, paragraph }: { active?: boolean; paragraph?: { rows?: number } }) => (
      <div data-testid="skeleton" data-active={active} data-rows={paragraph?.rows}>
        Mock Skeleton
      </div>
    ),
    {
      Image: () => <div data-testid="skeleton-image" />
    }
  )
}));

describe('PageSkeleton', () => {
  it('renders correctly with all skeleton elements', () => {
    render(<PageSkeleton />);
    
    // Check if main skeleton elements are rendered
    const skeletonElements = screen.getAllByTestId('skeleton');
    expect(skeletonElements).toHaveLength(2);
    
    // Check if skeleton image is rendered
    const skeletonImage = screen.getByTestId('skeleton-image');
    expect(skeletonImage).toBeInTheDocument();
    
    // Verify the first skeleton has 4 rows
    expect(skeletonElements[0]).toHaveAttribute('data-rows', '4');
    
    // Verify the second skeleton has 3 rows
    expect(skeletonElements[1]).toHaveAttribute('data-rows', '3');
    
    // Verify all skeletons are active
    skeletonElements.forEach(element => {
      expect(element).toHaveAttribute('data-active', 'true');
    });
  });
}); 