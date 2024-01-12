import {
  ComparisonOperator,
  CriteriaAggregate,
  CriteriaAggregateType,
} from '../../../types/CriteriaTypes';
import aggregateCriteriaToFilterDto from './aggregateCriteriaToFilterDto';
import { BursarExportFilterAggregate } from '../types';

describe('Conversion of aggregate criteria to filter DTO', () => {
  it.each<
    [CriteriaAggregate | undefined, BursarExportFilterAggregate | undefined]
  >([
    [undefined, undefined],
    [{ type: CriteriaAggregateType.PASS }, undefined],

    [
      { type: CriteriaAggregateType.NUM_ROWS, amount: '12' },
      {
        type: 'Aggregate',
        property: 'NUM_ROWS',
        condition: 'GREATER_THAN_EQUAL',
        amount: 12,
      },
    ],
    [
      {
        type: CriteriaAggregateType.NUM_ROWS,
        amount: '12',
        operator: ComparisonOperator.LESS_THAN,
      },
      {
        type: 'Aggregate',
        property: 'NUM_ROWS',
        condition: 'LESS_THAN',
        amount: 12,
      },
    ],

    [
      { type: CriteriaAggregateType.TOTAL_AMOUNT, amountDollars: '12.34' },
      {
        type: 'Aggregate',
        property: 'TOTAL_AMOUNT',
        condition: 'GREATER_THAN_EQUAL',
        amount: 1234,
      },
    ],
    [
      {
        type: CriteriaAggregateType.TOTAL_AMOUNT,
        amountDollars: '12.34',
        operator: ComparisonOperator.LESS_THAN,
      },
      {
        type: 'Aggregate',
        property: 'TOTAL_AMOUNT',
        condition: 'LESS_THAN',
        amount: 1234,
      },
    ],
  ])('converts %s into %s', (input, expected) =>
    expect(aggregateCriteriaToFilterDto(input)).toEqual(expected)
  );
});
