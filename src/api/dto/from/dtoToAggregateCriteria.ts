import { IntlShape } from 'react-intl';
import { StripesType } from '@folio/stripes/core';
import {
  ComparisonOperator,
  CriteriaAggregate,
  CriteriaAggregateType,
  CriteriaTokenType,
} from '../../../types';
import { BursarExportFilterAggregate } from '../dto-types';

// inverse of ../to/aggregateCriteriaToFilterDto
export default function dtoToAggregateCriteria(
  filter: Partial<BursarExportFilterAggregate> | undefined,
  stripes: StripesType,
  intl: IntlShape,
): CriteriaAggregate | undefined {
  if (!filter || typeof filter.property !== 'string' || typeof filter.condition !== 'string' || typeof filter.amount !== 'number') {
    return undefined;
  }
  switch (filter?.property) {
    case CriteriaTokenType.NUM_ROWS:
      return {
        type: CriteriaAggregateType.NUM_ROWS,
        operator: filter.condition as ComparisonOperator,
        amount: intl.formatNumber(filter.amount, { style: 'currency', currency: stripes.currency }),
      };
    case CriteriaTokenType.TOTAL_AMOUNT:
      return {
        type: CriteriaAggregateType.TOTAL_AMOUNT,
        operator: filter.condition as ComparisonOperator,
        amountCurrency: intl.formatNumber(filter.amount / 100, { style: 'currency', currency: stripes.currency }),
      };
    default:
      return undefined;
  }
}
