import {
  ComparisonOperator,
  CriteriaAggregate,
  CriteriaAggregateType,
} from '../../../types/CriteriaTypes';
import { BursarExportFilterAggregate } from '../types';

// inverse of ../to/aggregateCriteriaToFilterDto
export default function dtoToAggregateCriteria(
  filter: BursarExportFilterAggregate | undefined
): CriteriaAggregate | undefined {
  switch (filter?.property) {
    case 'NUM_ROWS':
      return {
        type: CriteriaAggregateType.NUM_ROWS,
        operator: filter.condition as ComparisonOperator,
        amount: filter.amount.toString(),
      };
    case 'TOTAL_AMOUNT':
      return {
        type: CriteriaAggregateType.TOTAL_AMOUNT,
        operator: filter.condition as ComparisonOperator,
        amountDollars: (filter.amount / 100).toFixed(2),
      };
    default:
      return undefined;
  }
}
