import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { MAX_LIMIT } from './constants';

/**
 * Returned as part of GET /service-points v3.3
 * @see https://s3.amazonaws.com/foliodocs/api/mod-inventory-storage/r/service-point.html
 */
export interface ServicePointResponse {
  servicepoints: ServicePointDTO[];
  totalRecords: number;
}

/**
 * Returned as part of GET /service-points v3.3
 * @see https://s3.amazonaws.com/foliodocs/api/mod-inventory-storage/r/service-point.html
 */
export interface ServicePointDTO {
  /** Unique UUID for this service point */
  id: string;
  /** Human-displayable name for this service point */
  name: string;
  code: string;
  discoveryDisplayName: string;

  // don't care about these
  staffSlips: unknown[];
  metadata: unknown;
}

export default function useServicePoints() {
  const ky = useOkapiKy();

  return useQuery<ServicePointDTO[]>(
    ['ui-plugin-bursar-export', 'service-points'],
    async () =>
      (
        await ky
          .get(`service-points?cql.allRecords=1&limit=${MAX_LIMIT}`)
          .json<ServicePointResponse>()
      ).servicepoints
  );
}
