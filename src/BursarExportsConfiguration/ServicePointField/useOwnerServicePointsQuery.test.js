import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

import { useOkapiKy } from '@folio/stripes/core';

import { useOwnerServicePointsQuery } from './useOwnerServicePointsQuery';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useOwnerServicePointsQuery', () => {
  it('should fetch service points when ownerId is provided', async () => {
    const servicePointOwnerId = 'servicePointOwnerId';

    useOkapiKy.mockClear().mockReturnValue({
      get: () => ({
        json: () => ({
          isLoading: false,
          servicePointOwner: [{ id: servicePointOwnerId }],
        }),
      }),
    });

    const { result, waitFor } = renderHook(() => useOwnerServicePointsQuery('ownerId'), { wrapper });

    await waitFor(() => {
      return result.current.servicePoints.length;
    });

    expect(result.current.servicePoints[0].id).toBe(servicePointOwnerId);
  });
});
