import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

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

    const { result, waitFor } = renderHook(() => useTransferAccountsQuery('ownerId'), { wrapper });

    await waitFor(() => {
      return result.current.transferAccounts.length;
    });

    expect(result.current.transferAccounts[0].id).toBe(transfersId);
  });
});
