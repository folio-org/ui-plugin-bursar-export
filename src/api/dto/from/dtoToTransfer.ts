import { StripesType } from '@folio/stripes/core';
import { IntlShape } from 'react-intl';
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
  transferAccounts: TransferAccountDTO[],
  stripes: StripesType,
  intl: IntlShape,
): FormValues['transferInfo'] {
  return {
    conditions: (tokens.conditions ?? []).map(({ condition, account }) => ({
      condition: dtoToCriteria(condition, feeFineTypes, locations, stripes, intl),
      owner: getOwnerForAccount(transferAccounts, account),
      account,
    })),
    else: {
      owner: getOwnerForAccount(transferAccounts, tokens.else.account),
      account: tokens.else.account,
    },
  };
}

export function getOwnerForAccount(transferAccounts: TransferAccountDTO[], accountId: string) {
  return transferAccounts.find((type) => type.id === accountId)?.ownerId;
}
