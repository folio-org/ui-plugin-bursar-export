import {
  CriteriaAggregate,
  CriteriaAggregateType,
} from '../../../types/CriteriaTypes';
import guardNumber from '../../../utils/guardNumber';
import { BursarExportFilterAggregate } from '../types';

export default function aggregateCriteriaToFilterDto(
  criteria: CriteriaAggregate | undefined
): BursarExportFilterAggregate | undefined {
  switch (criteria?.type) {
    case CriteriaAggregateType.NUM_ROWS:
      return {
        type: 'Aggregate',
        property: 'NUM_ROWS',
        condition: criteria.operator ?? 'GREATER_THAN_EQUAL',
        amount: guardNumber(criteria.amount, 0),
      };

    case CriteriaAggregateType.TOTAL_AMOUNT:
      return {
        type: 'Aggregate',
        property: 'TOTAL_AMOUNT',
        condition: criteria.operator ?? 'GREATER_THAN_EQUAL',
        amount: guardNumber(criteria.amountDollars, 0, (value) => value * 100),
      };

    default:
      return undefined;
  }
}
