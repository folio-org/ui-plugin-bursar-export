import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { renderHook, waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { useOkapiKy } from '@folio/stripes/core';

import { useTransferAccountsQuery } from './useTransferAccountsQuery';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useTransferAccountsQuery', () => {
  it('should fetch transfer accounts when ownerId is provided', async () => {
    const transfersId = 'transfersId';

    useOkapiKy.mockClear().mockReturnValue({
      get: () => ({
        json: () => ({
          isLoading: false,
          transfers: [{ id: transfersId }],
        }),
      }),
    });

    const { result } = renderHook(() => useTransferAccountsQuery('ownerId'), { wrapper });

    await waitFor(() => {
      return expect(result.current.transferAccounts.length).toBeTruthy();
    });

    expect(result.current.transferAccounts[0].id).toBe(transfersId);
  });
});
