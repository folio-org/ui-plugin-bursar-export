import { IntlShape } from 'react-intl';
import { StripesType } from '@folio/stripes/core';
import { CriteriaTerminalType, DataTokenType, FormValues, SchedulingFrequency } from '../../../types';
import { SavedJobConfiguration } from '../dto-types';
import dtoToFormValues from './dtoToFormValues';
import getIntl from '../../../../test/util/getIntl';

// United States
let intlEn: IntlShape;

beforeAll(() => {
  intlEn = getIntl('en-US', 'EST');
});

describe('dtoToFormValues', () => {
  test.each<[SavedJobConfiguration | null | undefined, Partial<FormValues>]>([
    [null, {}],
    [undefined, {}],
    [
      {
        id: 'id',
        type: 'BURSAR_FEES_FINES',
        tenant: 'diku',
        schedulePeriod: SchedulingFrequency.Manual,
        exportTypeSpecificParameters: {
          bursarFeeFines: {
            groupByPatron: false,
            data: [{ type: 'Constant', value: '\n' }],
            filter: { type: 'Pass' },
            transferInfo: { else: { account: 'account' } },
          },
        },
      },
      {
        scheduling: { frequency: SchedulingFrequency.Manual },
        criteria: { type: CriteriaTerminalType.PASS },
        aggregate: false,
        header: [],
        data: [{ type: DataTokenType.NEWLINE }],
        footer: [],
        transferInfo: {
          conditions: [],
          else: { account: 'account' },
        },
      },
    ],
    [
      {
        id: 'id',
        type: 'BURSAR_FEES_FINES',
        tenant: 'diku',
        schedulePeriod: SchedulingFrequency.Manual,
        exportTypeSpecificParameters: {
          bursarFeeFines: {
            groupByPatron: true,
            data: [{ type: 'Constant', value: '\n' }],
            filter: { type: 'Pass' },
            transferInfo: { else: { account: 'account' } },
          },
        },
      },
      {
        scheduling: { frequency: SchedulingFrequency.Manual },
        criteria: { type: CriteriaTerminalType.PASS },
        aggregate: true,
        header: [],
        dataAggregate: [{ type: DataTokenType.NEWLINE }],
        footer: [],
        transferInfo: {
          conditions: [],
          else: { account: 'account' },
        },
      },
    ],
  ])('Converts DTO %s to %s', (input, expected) => expect(dtoToFormValues(input, [], [], [], [], { currency: 'USD' } as StripesType, intlEn)).toEqual(expected));
});
