import {
  useQuery,
  useQueryClient,
} from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { LIMIT_MAX } from '@folio/stripes-acq-components';

const getQueryKey = ownerId => ['ui-plugin-bursar-export', 'feefines', ownerId];

export const useOwnerFeeFinesQuery = (ownerId, prevOwnerId) => {
  const queryClient = useQueryClient();
  const ky = useOkapiKy();

  if (prevOwnerId && prevOwnerId !== ownerId) {
    queryClient.removeQueries(getQueryKey(prevOwnerId));
  }

  const { isLoading, data = [] } = useQuery({
    queryKey: getQueryKey(ownerId),
    queryFn: async () => {
      const kyOptions = {
        searchParams: {
          limit: LIMIT_MAX,
          query: `(automatic==true${ownerId ? ` or ownerId==${ownerId}` : ''}) sortby feeFineType`,
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
