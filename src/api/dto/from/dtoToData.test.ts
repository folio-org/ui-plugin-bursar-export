import { CriteriaTerminalType } from '../../../types/CriteriaTypes';
import {
  DataToken,
  DataTokenType,
  DateFormatType,
} from '../../../types/TokenTypes';
import { BursarExportDataTokenDTO } from '../types';
import dtoToData, { dtoToDataToken } from './dtoToData';

describe('DTO to data conversion for initial values', () => {
  it.each<[BursarExportDataTokenDTO, DataToken]>([
    [{ type: 'Constant', value: '\n' }, { type: DataTokenType.NEWLINE }],
    [
      { type: 'Constant', value: '\r\n' },
      { type: DataTokenType.NEWLINE_MICROSOFT },
    ],
    [{ type: 'Constant', value: ',' }, { type: DataTokenType.COMMA }],
    [{ type: 'Constant', value: '\t' }, { type: DataTokenType.TAB }],
    [
      { type: 'Constant', value: '   ' },
      { type: DataTokenType.SPACE, repeat: '3' },
    ],
    [
      { type: 'Constant', value: 'foo' },
      { type: DataTokenType.ARBITRARY_TEXT, text: 'foo' },
    ],

    [
      { type: 'Aggregate', value: 'NUM_ROWS', decimal: false },
      { type: DataTokenType.AGGREGATE_COUNT },
    ],
    [
      { type: 'Aggregate', value: 'TOTAL_AMOUNT', decimal: false },
      { type: DataTokenType.AGGREGATE_TOTAL, decimal: false },
    ],
    [
      { type: 'Aggregate', value: 'TOTAL_AMOUNT', decimal: true },
      { type: DataTokenType.AGGREGATE_TOTAL, decimal: true },
    ],

    [
      { type: 'FeeAmount', decimal: false },
      { type: DataTokenType.ACCOUNT_AMOUNT, decimal: false },
    ],
    [
      { type: 'FeeAmount', decimal: true },
      { type: DataTokenType.ACCOUNT_AMOUNT, decimal: true },
    ],

    [
      { type: 'CurrentDate', value: 'YEAR_LONG', timezone: 'somewhere' },
      {
        type: DataTokenType.CURRENT_DATE,
        format: DateFormatType.YEAR_LONG,
        timezone: 'somewhere',
      },
    ],
    [
      {
        type: 'FeeDate',
        value: 'YEAR_LONG',
        timezone: 'somewhere',
        placeholder: 'placeholder',
        property: 'CREATED',
      },
      {
        type: DataTokenType.ACCOUNT_DATE,
        format: DateFormatType.YEAR_LONG,
        timezone: 'somewhere',
        placeholder: 'placeholder',
        dateProperty: 'CREATED',
      },
    ],

    [
      { type: 'FeeMetadata', value: 'FEE_FINE_TYPE_ID' },
      {
        type: DataTokenType.FEE_FINE_TYPE,
        feeFineAttribute: 'FEE_FINE_TYPE_ID',
      },
    ],
    [
      { type: 'ItemData', value: 'NAME', placeholder: 'placeholder' },
      {
        type: DataTokenType.ITEM_INFO,
        itemAttribute: 'NAME',
        placeholder: 'placeholder',
      },
    ],
    [
      { type: 'UserData', value: 'FOLIO_ID' },
      { type: DataTokenType.USER_DATA, userAttribute: 'FOLIO_ID' },
    ],
    [
      {
        type: 'UserDataOptional',
        value: 'FIRST_NAME',
        placeholder: 'placeholder',
      },
      {
        type: DataTokenType.USER_DATA,
        userAttribute: 'FIRST_NAME',
        placeholder: 'placeholder',
      },
    ],
    [
      {
        type: 'Conditional',
        conditions: [
          {
            condition: { type: 'Age', numDays: 12 },
            value: { type: 'Constant', value: 'foo' },
          },
        ],
        else: { type: 'Constant', value: 'else' },
      },
      {
        type: DataTokenType.CONSTANT_CONDITIONAL,
        conditions: [
          {
            type: CriteriaTerminalType.AGE,
            numDays: '12',
            value: 'foo',
          },
        ],
        else: 'else',
      },
    ],
  ])('converts token %s to %s', (input, expected) =>
    expect(dtoToDataToken(input, [], [])).toEqual(expected)
  );

  it('converts undefined to empty array', () =>
    expect(dtoToData(undefined, [], [])).toEqual([]));

  it('converts token array to data', () =>
    expect(
      dtoToData(
        [
          { type: 'Constant', value: '\n' },
          { type: 'Constant', value: '\r\n' },
          { type: 'Constant', value: ',' },
          { type: 'Constant', value: '\t' },
          { type: 'Constant', value: '   ' },
          { type: 'Constant', value: 'foo' },
        ],
        [],
        []
      )
    ).toEqual([
      { type: DataTokenType.NEWLINE },
      { type: DataTokenType.NEWLINE_MICROSOFT },
      { type: DataTokenType.COMMA },
      { type: DataTokenType.TAB },
      { type: DataTokenType.SPACE, repeat: '3' },
      { type: DataTokenType.ARBITRARY_TEXT, text: 'foo' },
    ]));
});
