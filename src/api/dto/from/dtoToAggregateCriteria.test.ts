import {
  ComparisonOperator,
  CriteriaAggregate,
  CriteriaAggregateType,
} from '../../../types/CriteriaTypes';
import { BursarExportFilterAggregate } from '../types';
import dtoToAggregateCriteria from './dtoToAggregateCriteria';

test.each<
  [BursarExportFilterAggregate | undefined, CriteriaAggregate | undefined]
>([
  [undefined, undefined],
  [
    {
      type: 'Aggregate',
      property: 'NUM_ROWS',
      condition: 'LESS_THAN_EQUAL',
      amount: 1523,
    },
    {
      type: CriteriaAggregateType.NUM_ROWS,
      operator: ComparisonOperator.LESS_THAN_EQUAL,
      amount: '1523',
    },
  ],
  [
    {
      type: 'Aggregate',
      property: 'TOTAL_AMOUNT',
      condition: 'GREATER_THAN',
      amount: 1523,
    },
    {
      type: CriteriaAggregateType.TOTAL_AMOUNT,
      operator: ComparisonOperator.GREATER_THAN,
      amountDollars: '15.23',
    },
  ],
])('dtoToAggregateCriteria(%s) === %s', (input, expected) =>
  expect(dtoToAggregateCriteria(input)).toEqual(expected)
);
