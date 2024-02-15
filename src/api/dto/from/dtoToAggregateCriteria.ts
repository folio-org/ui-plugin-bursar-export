import { IntlShape } from 'react-intl';
import { StripesType } from '@folio/stripes/core';
import { ComparisonOperator, CriteriaAggregate, CriteriaAggregateType } from '../../../types/CriteriaTypes';
import { BursarExportFilterAggregate } from '../types';

// inverse of ../to/aggregateCriteriaToFilterDto
export default function dtoToAggregateCriteria(
  filter: BursarExportFilterAggregate | undefined,
  stripes: StripesType,
  intl: IntlShape,
): CriteriaAggregate | undefined {
  switch (filter?.property) {
    case 'NUM_ROWS':
      return {
        type: CriteriaAggregateType.NUM_ROWS,
        operator: filter.condition as ComparisonOperator,
        amount: intl.formatNumber(filter.amount, { style: 'currency', currency: stripes.currency }),
      };
    case 'TOTAL_AMOUNT':
      return {
        type: CriteriaAggregateType.TOTAL_AMOUNT,
        operator: filter.condition as ComparisonOperator,
        amountCurrency: intl.formatNumber(filter.amount / 100, { style: 'currency', currency: stripes.currency }),
      };
    default:
      return undefined;
  }
}
