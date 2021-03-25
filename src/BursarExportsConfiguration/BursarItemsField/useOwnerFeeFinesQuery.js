import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { LIMIT_MAX } from '@folio/stripes-acq-components';

export const useOwnerFeeFinesQuery = (ownerId) => {
  const ky = useOkapiKy();

  const { isLoading, data = [] } = useQuery({
    queryKey: ['ui-plugin-bursar-export', 'feefines', ownerId],
    queryFn: async () => {
      const kyOptions = {
        searchParams: {
          limit: LIMIT_MAX,
          query: `ownerId==${ownerId} sortby feeFineType`,
        },
      };
      const { feefines = [] } = await ky.get('feefines', kyOptions).json();

      return feefines;
    },
    enabled: Boolean(ownerId),
  });

  return {
    isLoading,
    feeFines: data,
  };
};
