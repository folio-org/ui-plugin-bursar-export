import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { LIMIT_MAX } from '@folio/stripes-acq-components';

export const useTransferAccountsQuery = (ownerId) => {
  const ky = useOkapiKy();

  const { isLoading, data = [] } = useQuery({
    queryKey: ['ui-plugin-bursar-export', 'transferAccounts', ownerId],
    queryFn: async () => {
      const kyOptions = {
        searchParams: {
          limit: LIMIT_MAX,
          query: `ownerId==${ownerId} sortby accountName`,
        },
      };
      const { transfers = [] } = await ky.get('transfers', kyOptions).json();

      return transfers;
    },
    enabled: Boolean(ownerId),
  });

  return {
    isLoading,
    transferAccounts: data,
  };
};
