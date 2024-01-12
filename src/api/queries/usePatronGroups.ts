import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { MAX_LIMIT } from './constants';

/**
 * Returned from GET /groups v15.3
 * @see https://s3.amazonaws.com/foliodocs/api/mod-users/r/groups.html#groups_get
 */
export interface PatronGroupResponse {
  totalRecords: number;
  usergroups: PatronGroupDTO[];
}

/**
 * Returned as part of GET /groups v15.3
 * @see https://s3.amazonaws.com/foliodocs/api/mod-users/r/groups.html#groups_get
 */
export interface PatronGroupDTO {
  /** Unique UUID for this group */
  id: string;
  /** Unique, human-readable name of this group (e.g. "staff" or "undergraduate") */
  group: string;
  /** A description of the group's members */
  desc?: string;

  // don't care about these
  expirationOffsetInDays?: number;
  metadata?: unknown;
}

export default function usePatronGroups() {
  const ky = useOkapiKy();

  return useQuery<PatronGroupDTO[]>(
    ['ui-plugin-bursar-export', 'patron-groups'],
    async () =>
      (await ky.get(`groups?limit=${MAX_LIMIT}`).json<PatronGroupResponse>())
        .usergroups
  );
}
