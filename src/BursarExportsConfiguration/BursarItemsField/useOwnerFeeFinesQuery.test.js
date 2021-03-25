import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

import { useOkapiKy } from '@folio/stripes/core';

import { useOwnerFeeFinesQuery } from './useOwnerFeeFinesQuery';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useOwnerFeeFinesQuery', () => {
  it('should fetch fee/fines when ownerId is provided', async () => {
    const feeFineId = 'feeFineId';

    useOkapiKy.mockClear().mockReturnValue({
      get: () => ({
        json: () => ({
          isLoading: false,
          feefines: [{ id: feeFineId }],
        }),
      }),
    });

    const { result, waitFor } = renderHook(() => useOwnerFeeFinesQuery('ownerId'), { wrapper });

    await waitFor(() => {
      return result.current.feeFines.length;
    });

    expect(result.current.feeFines[0].id).toBe(feeFineId);
  });
});
