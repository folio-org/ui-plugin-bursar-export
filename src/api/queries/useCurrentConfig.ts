import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { SavedJobConfiguration } from '../dto/types';

export interface CurrentConfigResponse {
  totalRecords: number;
  configs?: SavedJobConfiguration[];
}

export default function useCurrentConfig() {
  const ky = useOkapiKy();

  return useQuery<SavedJobConfiguration | null>(
    ['ui-plugin-bursar-export', 'current-config'],
    async () =>
      (
        await ky
          .get('data-export-spring/configs', {
            searchParams: { limit: 1, query: 'type==BURSAR_FEES_FINES' },
          })
          .json<CurrentConfigResponse>()
      ).configs?.[0] ?? null,
  );
}
