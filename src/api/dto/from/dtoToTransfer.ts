import FormValues from '../../../types/FormValues';
import { FeeFineTypeDTO } from '../../queries/useFeeFineTypes';
import { LocationDTO } from '../../queries/useLocations';
import { TransferAccountDTO } from '../../queries/useTransferAccounts';
import { BursarExportTransferCriteria } from '../types';
import dtoToCriteria from './dtoToCriteria';

// inverse of ../to/transferToDto
export default function dtoToTransfer(
  tokens: BursarExportTransferCriteria,
  feeFineTypes: FeeFineTypeDTO[],
  locations: LocationDTO[],
  transferAccounts: TransferAccountDTO[]
): FormValues['transferInfo'] {
  return {
    conditions: (tokens.conditions ?? []).map(({ condition, account }) => ({
      condition: dtoToCriteria(condition, feeFineTypes, locations),
      owner: getOwnerForAccount(transferAccounts, account),
      account,
    })),
    else: {
      owner: getOwnerForAccount(transferAccounts, tokens.else.account),
      account: tokens.else.account,
    },
  };
}

export function getOwnerForAccount(
  transferAccounts: TransferAccountDTO[],
  accountId: string
) {
  return transferAccounts.find((type) => type.id === accountId)?.ownerId;
}
