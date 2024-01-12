import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { MAX_LIMIT } from './constants';

/**
 * Returned as part of GET /location-units/institutions v2.0
 * @see https://s3.amazonaws.com/foliodocs/api/mod-inventory-storage/r/locationunit.html#location_units_institutions_get
 */
export interface InstitutionsResponse {
  locinsts: InstitutionDTO[];
  totalRecords: number;
}

/**
 * Returned as part of GET /location-units/institutions v2.0
 * @see https://s3.amazonaws.com/foliodocs/api/mod-inventory-storage/r/locationunit.html#location_units_institutions_get
 */
export interface InstitutionDTO {
  /** Unique UUID for this institution */
  id: string;
  /** Human-displayable name for this institution */
  name: string;
  code: string;

  // don't care about these
  metadata?: unknown;
}

export default function useInstitutions() {
  const ky = useOkapiKy();

  return useQuery<InstitutionDTO[]>(
    ['ui-plugin-bursar-export', 'institutions'],
    async () =>
      (
        await ky
          .get(
            `location-units/institutions?cql.allRecords=1&limit=${MAX_LIMIT}`
          )
          .json<InstitutionsResponse>()
      ).locinsts
  );
}
