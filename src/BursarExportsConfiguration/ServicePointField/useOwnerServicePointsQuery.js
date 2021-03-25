import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

export const useOwnerServicePointsQuery = (ownerId) => {
  const ky = useOkapiKy();

  const { isLoading, data = {} } = useQuery({
    queryKey: ['ui-plugin-bursar-export', 'owner', ownerId],
    queryFn: () => ky.get(`owners/${ownerId}`).json(),
    enabled: Boolean(ownerId),
  });

  return {
    isLoading,
    servicePoints: data.servicePointOwner || [],
  };
};
