import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { MAX_LIMIT } from './constants';

/**
 * Returned as part of GET /locations v3.0
 * @see https://s3.amazonaws.com/foliodocs/api/mod-inventory-storage/r/location.html#locations_get
 */
export interface LocationsResponse {
  locations: LocationDTO[];
  totalRecords: number;
}

/**
 * Returned as part of GET /locations v3.0
 * @see https://s3.amazonaws.com/foliodocs/api/mod-inventory-storage/r/location.html#locations_get
 */
export interface LocationDTO {
  /** Unique UUID for this location */
  id: string;
  /** Human-displayable name for this location */
  name: string;
  code: string;

  institutionId: string;
  campusId: string;
  libraryId: string;
  primaryServicePoint: string;

  // don't care about these
  description?: string;
  discoveryDisplayName?: string;
  isActive?: boolean;
  institution?: unknown;
  campus?: unknown;
  library?: unknown;
  details?: unknown;
  primaryServicePointObject?: unknown;
  servicePointIds?: string[];
  servicePoints?: unknown[];
  metadata?: unknown;
}

export default function useLocations() {
  const ky = useOkapiKy();

  return useQuery<LocationDTO[]>(
    ['ui-plugin-bursar-export', 'locations'],
    async () =>
      (
        await ky
          .get(`locations?cql.allRecords=1&limit=${MAX_LIMIT}`)
          .json<LocationsResponse>()
      ).locations
  );
}
