import React from 'react';
import { vi } from 'vitest';

vi.mock("antd", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Skeleton: {
      Image: () => <div>Mocked Skeleton Image</div>, // Mocking the Skeleton.Image component
      // Add the Skeleton component itself if needed
      // You can also mock other methods or components here
    },
    // ... other mocked methods if any ...
  };
}); 