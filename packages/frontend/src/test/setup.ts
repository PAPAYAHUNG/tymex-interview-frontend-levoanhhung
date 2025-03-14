import { expect, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';

expect.extend(jestDomMatchers);

afterEach(() => {
  cleanup();
}); 