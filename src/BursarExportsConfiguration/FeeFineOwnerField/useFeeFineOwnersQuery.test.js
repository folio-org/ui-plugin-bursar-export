import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { renderHook, waitFor } from '@folio/jest-config-stripes/testing-library/react';

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

    const { result } = renderHook(() => useFeeFineOwnersQuery(), { wrapper });

    await waitFor(() => {
      return expect(result.current.owners.length).toBeTruthy();
    });

    expect(result.current.owners[0].id).toBe(ownerId);
  });
});
