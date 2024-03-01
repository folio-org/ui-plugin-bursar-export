import { FormValues } from '../../../types';
import { BursarExportTransferCriteria } from '../dto-types';
import criteriaToFilterDto from './criteriaToFilterDto';

export default function transferToDto(
  transferInfo: FormValues['transferInfo'],
): BursarExportTransferCriteria {
  return {
    conditions: (transferInfo?.conditions ?? []).map(({ condition, account }) => ({
      condition: criteriaToFilterDto(condition),
      account: account ?? '',
    })),
    else: { account: transferInfo?.else?.account ?? '' },
  };
}
