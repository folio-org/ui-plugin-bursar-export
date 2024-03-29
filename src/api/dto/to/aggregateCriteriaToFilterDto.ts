import {
  CriteriaAggregate,
  CriteriaAggregateType,
  CriteriaTokenType,
} from '../../../types';
import guardNumber from '../../../utils/guardNumber';
import { BursarExportFilterAggregate } from '../dto-types';

export default function aggregateCriteriaToFilterDto(
  criteria: CriteriaAggregate | undefined,
): BursarExportFilterAggregate | undefined {
  switch (criteria?.type) {
    case CriteriaAggregateType.NUM_ROWS:
      return {
        type: 'Aggregate',
        property: CriteriaTokenType.NUM_ROWS,
        condition: criteria.operator ?? 'GREATER_THAN_EQUAL',
        amount: guardNumber(criteria.amount, 0),
      };

    case CriteriaAggregateType.TOTAL_AMOUNT:
      return {
        type: 'Aggregate',
        property: CriteriaTokenType.TOTAL_AMOUNT,
        condition: criteria.operator ?? 'GREATER_THAN_EQUAL',
        amount: guardNumber(criteria.amountCurrency, 0, (value) => value * 100),
      };

    default:
      return undefined;
  }
}
