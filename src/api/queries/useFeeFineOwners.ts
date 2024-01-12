import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { MAX_LIMIT } from './constants';

/**
 * Returned as part of GET /owners v1
 * @see https://s3.amazonaws.com/foliodocs/api/mod-feesfines/r/owners.html
 */
export interface FeeFineOwnerResponse {
  owners: FeeFineOwnerDTO[];
  totalRecords: number;
}

/**
 * Returned as part of GET /owners v1
 * @see https://s3.amazonaws.com/foliodocs/api/mod-feesfines/r/owners.html
 */
export interface FeeFineOwnerDTO {
  /** Owner's UUID */
  id: string;
  /** Owner's name (human readable) */
  owner: string;
  desc: string;
  /** Service points associated to with the owner */
  servicePointOwner: {
    /** service point ID */
    value: string;
    /** service point label */
    label: string;
  }[];

  // don't care about these
  defaultChargeNoticeId: string;
  defaultActionNoticeId: string;
  metadata: unknown;
}

export default function useFeeFineOwners() {
  const ky = useOkapiKy();

  return useQuery<FeeFineOwnerDTO[]>(
    ['ui-plugin-bursar-export', 'owners'],
    async () =>
      (
        await ky
          .get(`owners?cql.allRecords=1&limit=${MAX_LIMIT}`)
          .json<FeeFineOwnerResponse>()
      ).owners
  );
}
