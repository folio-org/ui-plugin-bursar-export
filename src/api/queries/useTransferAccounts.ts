import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { MAX_LIMIT } from './constants';

/**
 * Returned as part of GET /transfers v1
 * @see https://s3.amazonaws.com/foliodocs/api/mod-feesfines/r/transfers.html
 */
export interface TransferAccountResponse {
  transfers: TransferAccountDTO[];
  totalRecords: number;
}

/**
 * Returned as part of GET /transfers v1
 * @see https://s3.amazonaws.com/foliodocs/api/mod-feesfines/r/transfers.html
 */
export interface TransferAccountDTO {
  /** Account UUID */
  id: string;
  /** Transfer account's owner's UUID */
  ownerId: string;
  /** Account name */
  accountName: string;
  desc: string;

  // don't care about these
  metadata: unknown;
}

export default function useTransferAccounts() {
  const ky = useOkapiKy();

  return useQuery<TransferAccountDTO[]>(
    ['ui-plugin-bursar-export', 'trasfer-accounts'],
    async () =>
      (
        await ky
          .get(`transfers?cql.allRecords=1&limit=${MAX_LIMIT}`)
          .json<TransferAccountResponse>()
      ).transfers
  );
}
