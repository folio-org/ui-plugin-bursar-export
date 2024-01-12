import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { MAX_LIMIT } from './constants';

/**
 * Returned as part of GET /location-units/campuses v2.0
 * @see https://s3.amazonaws.com/foliodocs/api/mod-inventory-storage/r/locationunit.html#location_units_campuses_get
 */
export interface CampusesResponse {
  loccamps: CampusDTO[];
  totalRecords: number;
}

/**
 * Returned as part of GET /location-units/campuses v2.0
 * @see https://s3.amazonaws.com/foliodocs/api/mod-inventory-storage/r/locationunit.html#location_units_campuses_get
 */
export interface CampusDTO {
  /** Unique UUID for this campus */
  id: string;
  /** Human-displayable name for this campus */
  name: string;
  code: string;
  /** the associated institution */
  institutionId: string;

  // don't care about these
  metadata?: unknown;
}

export default function useCampuses() {
  const ky = useOkapiKy();

  return useQuery<CampusDTO[]>(
    ['ui-plugin-bursar-export', 'campuses'],
    async () =>
      (
        await ky
          .get(`location-units/campuses?cql.allRecords=1&limit=${MAX_LIMIT}`)
          .json<CampusesResponse>()
      ).loccamps
  );
}
