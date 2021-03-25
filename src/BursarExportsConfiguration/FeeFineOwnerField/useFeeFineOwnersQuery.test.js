import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

import { useOkapiKy } from '@folio/stripes/core';

import { useFeeFineOwnersQuery } from './useFeeFineOwnersQuery';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useFeeFineOwnersQuery', () => {
  it('should fetch fee fine owners', async () => {
    const ownerId = 'ownerId';

    useOkapiKy.mockClear().mockReturnValue({
      get: () => ({
        json: () => ({
          isLoading: false,
          owners: [{ id: ownerId }],
        }),
      }),
    });

    const { result, waitFor } = renderHook(() => useFeeFineOwnersQuery(), { wrapper });

    await waitFor(() => {
      return result.current.owners.length;
    });

    expect(result.current.owners[0].id).toBe(ownerId);
  });
});
