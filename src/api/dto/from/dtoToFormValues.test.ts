import { IntlShape } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { CriteriaTerminalType } from '../../../types/CriteriaTypes';
import FormValues from '../../../types/FormValues';
import SchedulingFrequency from '../../../types/SchedulingFrequency';
import { DataTokenType } from '../../../types/TokenTypes';
import { SavedJobConfiguration } from '../types';
import dtoToFormValues from './dtoToFormValues';
import getIntl from '../../../test/util/getIntl';

// United States
let intlEn: IntlShape;

beforeAll(() => {
  intlEn = getIntl('en-US', 'EST');
});

jest.mock('@folio/stripes/core');

const mockedUseStripes = useStripes as jest.Mock;

describe('dtoToFormValues', () => {
  const stripes = mockedUseStripes();

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
  ])('Converts DTO %s to %s', (input, expected) => expect(dtoToFormValues(input, [], [], [], [], stripes, intlEn)).toEqual(expected));
});
