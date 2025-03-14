import { render } from '@testing-library/react';
import { QueryParamProvider } from 'use-query-params';
import { ReactNode } from 'react';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

export const renderWithQueryParams = (ui: ReactNode) => {
  return render(
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      {ui}
    </QueryParamProvider>
  );
}; 