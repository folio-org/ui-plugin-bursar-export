import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { LIMIT_MAX } from '@folio/stripes-acq-components';

export const useFeeFineOwnersQuery = () => {
  const ky = useOkapiKy();

  const { isLoading, data = [] } = useQuery({
    queryKey: ['ui-plugin-bursar-export', 'owners'],
    queryFn: async () => {
      const kyOptions = {
        searchParams: {
          limit: LIMIT_MAX,
          query: 'cql.allRecords=1 sortby owner',
        },
      };
      const { owners = [] } = await ky.get('owners', kyOptions).json();

      return owners;
    },
  });

  return {
    isLoading,
    owners: data,
  };
};
