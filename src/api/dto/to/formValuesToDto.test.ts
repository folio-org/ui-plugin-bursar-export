import {
  CriteriaAggregateType,
  CriteriaTerminalType,
} from '../../../types/CriteriaTypes';
import FormValues from '../../../types/FormValues';
import SchedulingFrequency from '../../../types/SchedulingFrequency';
import {
  DataTokenType,
  HeaderFooterTokenType,
} from '../../../types/TokenTypes';
import formValuesToDto from './formValuesToDto';
import { BursarExportJobDTO } from '../types';

describe('Form values conversion', () => {
  const TEST_VALUE: Omit<FormValues, 'aggregate'> = {
    scheduling: { frequency: SchedulingFrequency.Manual },

    criteria: { type: CriteriaTerminalType.PASS },
    aggregateFilter: { type: CriteriaAggregateType.NUM_ROWS },

    header: [
      { type: HeaderFooterTokenType.ARBITRARY_TEXT, text: 'head' },
      { type: HeaderFooterTokenType.AGGREGATE_COUNT },
    ],

    data: [{ type: DataTokenType.ARBITRARY_TEXT, text: 'non-aggregate data' }],
    dataAggregate: [
      { type: DataTokenType.ARBITRARY_TEXT, text: 'aggregate data' },
    ],

    footer: [{ type: HeaderFooterTokenType.ARBITRARY_TEXT, text: 'foot' }],

    transferInfo: {
      conditions: [
        {
          condition: {
            type: CriteriaTerminalType.SERVICE_POINT,
            servicePointId: 'spId',
          },
          account: 'if-acct',
        },
      ],
      else: { account: 'else-sp' },
    },
  };

  const EXPECTED: Omit<
    BursarExportJobDTO,
    'data' | 'groupByPatron' | 'groupByPatronFilter'
  > = {
    filter: {
      type: 'Pass',
    },
    header: [
      { type: 'Constant', value: 'head' },
      {
        type: 'Aggregate',
        value: 'NUM_ROWS',
        decimal: false,
        lengthControl: undefined,
      },
    ],
    footer: [{ type: 'Constant', value: 'foot' }],
    transferInfo: {
      conditions: [
        {
          condition: { type: 'ServicePoint', servicePointId: 'spId' },
          account: 'if-acct',
        },
      ],
      else: { account: 'else-sp' },
    },
  };

  it('converts non-aggregate values', () =>
    expect(formValuesToDto({ ...TEST_VALUE, aggregate: false })).toEqual({
      ...EXPECTED,
      groupByPatron: false,
      data: [{ type: 'Constant', value: 'non-aggregate data' }],
    }));

  it('converts aggregate values', () =>
    expect(formValuesToDto({ ...TEST_VALUE, aggregate: true })).toEqual({
      ...EXPECTED,
      groupByPatron: true,
      groupByPatronFilter: {
        type: 'Aggregate',
        amount: 0,
        condition: 'GREATER_THAN_EQUAL',
        property: 'NUM_ROWS',
      },
      data: [{ type: 'Constant', value: 'aggregate data' }],
    }));
});
