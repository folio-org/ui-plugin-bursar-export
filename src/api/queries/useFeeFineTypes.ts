import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { MAX_LIMIT } from './constants';

/**
 * Returned as part of GET /feefines v1
 * @see https://s3.amazonaws.com/foliodocs/api/mod-feesfines/r/feefines.html
 */
export interface FeeFineTypeResponse {
  feefines: FeeFineTypeDTO[];
  totalRecords: number;
}

/**
 * Returned as part of GET /feefines v1
 * @see https://s3.amazonaws.com/foliodocs/api/mod-feesfines/r/feefines.html
 */
export interface FeeFineTypeDTO {
  /** Type UUID */
  id: string;
  /** Type name */
  feeFineType: string;
  automatic: boolean;
  ownerId?: string;

  // don't care about these
  defaultAmount?: number;
  chargeNoticeId?: string;
  actionNoticeId?: string;
  metadata: unknown;
}

export default function useFeeFineTypes() {
  const ky = useOkapiKy();

  return useQuery<FeeFineTypeDTO[]>(
    ['ui-plugin-bursar-export', 'types'],
    async () =>
      (
        await ky
          .get(`feefines?cql.allRecords=1&limit=${MAX_LIMIT}`)
          .json<FeeFineTypeResponse>()
      ).feefines
  );
}
