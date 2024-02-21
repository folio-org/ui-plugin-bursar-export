import { IntlShape } from 'react-intl';
import { StripesType } from '@folio/stripes/core';
import getIntl from '../../../../test/util/getIntl';
import { ComparisonOperator, CriteriaAggregate, CriteriaAggregateType } from '../../../types/CriteriaTypes';
import { BursarExportFilterAggregate } from '../types';
import dtoToAggregateCriteria from './dtoToAggregateCriteria';

// United States
let intlEn: IntlShape;
let intlEu: IntlShape;

beforeAll(() => {
  intlEn = getIntl('en-US', 'EST');
  intlEu = getIntl('fr-FR', 'CET');
});

describe('dtoToAggregateCriteria', () => {
  test.each<[BursarExportFilterAggregate | undefined, CriteriaAggregate | undefined]>([
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
        amount: '$1,523.00',
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
        amountCurrency: '$15.23',
      },
    ],
  ])('dtoToAggregateCriteria(%s) === %s', (input, expected) => expect(dtoToAggregateCriteria(input, { currency: 'USD' } as StripesType, intlEn)).toEqual(expected));

  // test for conversion to eur
  test.each<[BursarExportFilterAggregate | undefined, CriteriaAggregate | undefined]>([
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
        amountCurrency: '15,23\xa0€',
      },
    ],
  ])('with EUR dtoToAggregateCriteria(%s) === %s', (input, expected) => expect(dtoToAggregateCriteria(input, { currency: 'EUR' } as StripesType, intlEu)).toEqual(expected));
});
