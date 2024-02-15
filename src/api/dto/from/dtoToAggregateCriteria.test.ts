import { IntlShape } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import getIntl from '../../../test/util/getIntl';
import { ComparisonOperator, CriteriaAggregate, CriteriaAggregateType } from '../../../types/CriteriaTypes';
import { BursarExportFilterAggregate } from '../types';
import dtoToAggregateCriteria from './dtoToAggregateCriteria';

// United States
let intlEn: IntlShape;

beforeAll(() => {
  intlEn = getIntl('en-US', 'EST');
});

jest.mock('@folio/stripes/core');

const mockedUseStripes = useStripes as jest.Mock;

describe('dtoToAggregateCriteria', () => {
  const stripes = mockedUseStripes();

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
        amountCurrency: '15.23',
      },
    ],
  ])('dtoToAggregateCriteria(%s) === %s', (input, expected) => expect(dtoToAggregateCriteria(input, stripes, intlEn)).toEqual(expected));
});
