import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { MAX_LIMIT } from './constants';

/**
 * Returned as part of GET /location-units/libraries v2.0
 * @see https://s3.amazonaws.com/foliodocs/api/mod-inventory-storage/r/locationunit.html#location_units_libraries_get
 */
export interface LibrariesResponse {
  loclibs: LibraryDTO[];
  totalRecords: number;
}

/**
 * Returned as part of GET /location-units/libraries v2.0
 * @see https://s3.amazonaws.com/foliodocs/api/mod-inventory-storage/r/locationunit.html#location_units_libraries_get
 */
export interface LibraryDTO {
  /** Unique UUID for this library */
  id: string;
  /** Human-displayable name for this library */
  name: string;
  code: string;
  /** the associated campus */
  campusId: string;

  // don't care about these
  metadata?: unknown;
}

export default function useLibraries() {
  const ky = useOkapiKy();

  return useQuery<LibraryDTO[]>(
    ['ui-plugin-bursar-export', 'libraries'],
    async () =>
      (
        await ky
          .get(`location-units/libraries?cql.allRecords=1&limit=${MAX_LIMIT}`)
          .json<LibrariesResponse>()
      ).loclibs
  );
}
