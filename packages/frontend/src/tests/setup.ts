import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    // Implementation not needed for the mock
  }
  
  disconnect() {
    // Implementation not needed for the mock
  }
  
  observe() {
    // Implementation not needed for the mock
  }
  
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  
  unobserve() {
    // Implementation not needed for the mock
  }
}

// Set up the mock
global.IntersectionObserver = MockIntersectionObserver as any;

// runs a cleanup after each test case
afterEach(() => {
  cleanup()
}) 