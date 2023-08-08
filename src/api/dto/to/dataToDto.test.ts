import { CriteriaTerminalType } from '../../../types/CriteriaTypes';
import {
  DataToken,
  DataTokenType,
  DateFormatType,
} from '../../../types/TokenTypes';
import { BursarExportDataTokenDTO } from '../types';
import dataToDto, { dataTokenToDto } from './dataToDto';

describe('Data token conversion', () => {
  test.each<[DataToken, BursarExportDataTokenDTO]>([
    [{ type: DataTokenType.NEWLINE }, { type: 'Constant', value: '\n' }],
    [
      { type: DataTokenType.NEWLINE_MICROSOFT },
      { type: 'Constant', value: '\r\n' },
    ],
    [{ type: DataTokenType.TAB }, { type: 'Constant', value: '\t' }],
    [{ type: DataTokenType.COMMA }, { type: 'Constant', value: ',' }],
    [
      { type: DataTokenType.SPACE, repeat: '' },
      { type: 'Constant', value: '' },
    ],
    [
      { type: DataTokenType.SPACE, repeat: '5' },
      { type: 'Constant', value: '     ' },
    ],
    [
      { type: DataTokenType.ARBITRARY_TEXT, text: 'foo' },
      { type: 'Constant', value: 'foo' },
    ],

    [
      { type: DataTokenType.AGGREGATE_COUNT },
      { type: 'Aggregate', value: 'NUM_ROWS', decimal: false },
    ],

    [
      { type: DataTokenType.AGGREGATE_TOTAL, decimal: false },
      { type: 'Aggregate', value: 'TOTAL_AMOUNT', decimal: false },
    ],
    [
      { type: DataTokenType.AGGREGATE_TOTAL, decimal: true },
      { type: 'Aggregate', value: 'TOTAL_AMOUNT', decimal: true },
    ],

    [
      { type: DataTokenType.ACCOUNT_AMOUNT, decimal: false },
      { type: 'FeeAmount', decimal: false },
    ],
    [
      { type: DataTokenType.ACCOUNT_AMOUNT, decimal: true },
      { type: 'FeeAmount', decimal: true },
    ],

    [
      {
        type: DataTokenType.CURRENT_DATE,
        format: DateFormatType.DATE,
        timezone: 'timezone',
      },
      { type: 'CurrentDate', value: 'DATE', timezone: 'timezone' },
    ],

    [
      {
        type: DataTokenType.ACCOUNT_DATE,
        dateProperty: 'DUE',
        format: DateFormatType.QUARTER,
        timezone: 'timezone',
        placeholder: 'placeholder',
      },
      {
        type: 'FeeDate',
        property: 'DUE',
        value: 'QUARTER',
        timezone: 'timezone',
        placeholder: 'placeholder',
      },
    ],
    [
      {
        type: DataTokenType.ACCOUNT_DATE,
        dateProperty: 'DUE',
        format: DateFormatType.QUARTER,
        timezone: 'timezone',
      },
      {
        type: 'FeeDate',
        property: 'DUE',
        value: 'QUARTER',
        timezone: 'timezone',
        placeholder: '',
      },
    ],

    [
      {
        type: DataTokenType.FEE_FINE_TYPE,
        feeFineAttribute: 'FEE_FINE_TYPE_ID',
      },
      { type: 'FeeMetadata', value: 'FEE_FINE_TYPE_ID' },
    ],

    [
      { type: DataTokenType.ITEM_INFO, itemAttribute: 'CAMPUS_ID' },
      { type: 'ItemData', value: 'CAMPUS_ID', placeholder: '' },
    ],
    [
      {
        type: DataTokenType.ITEM_INFO,
        itemAttribute: 'BARCODE',
        placeholder: 'place',
      },
      { type: 'ItemData', value: 'BARCODE', placeholder: 'place' },
    ],

    [
      {
        type: DataTokenType.USER_DATA,
        userAttribute: 'FOLIO_ID',
        // no placeholders needed for this type, so it should be ignored
        placeholder: 'foo',
      },
      { type: 'UserData', value: 'FOLIO_ID' },
    ],
    [
      { type: DataTokenType.USER_DATA, userAttribute: 'PATRON_GROUP_ID' },
      { type: 'UserDataOptional', value: 'PATRON_GROUP_ID', placeholder: '' },
    ],
    [
      { type: DataTokenType.USER_DATA, userAttribute: 'EXTERNAL_SYSTEM_ID' },
      { type: 'UserDataOptional', value: 'EXTERNAL_SYSTEM_ID', placeholder: '' },
    ],
    [
      { type: DataTokenType.USER_DATA, userAttribute: 'BARCODE' },
      { type: 'UserDataOptional', value: 'BARCODE', placeholder: '' },
    ],
    [
      {
        type: DataTokenType.USER_DATA,
        userAttribute: 'FIRST_NAME',
        placeholder: 'fname',
      },
      { type: 'UserDataOptional', value: 'FIRST_NAME', placeholder: 'fname' },
    ],

    [
      {
        type: DataTokenType.CONSTANT_CONDITIONAL,
        conditions: undefined,
        else: 'else',
      },
      {
        type: 'Conditional',
        conditions: [],
        else: { type: 'Constant', value: 'else' },
      },
    ],

    [
      {
        type: DataTokenType.CONSTANT_CONDITIONAL,
        conditions: [
          {
            type: CriteriaTerminalType.PATRON_GROUP,
            patronGroupId: 'patronGroupId',
            value: 'if',
          },
        ],
        else: 'else',
      },
      {
        type: 'Conditional',
        conditions: [
          {
            condition: {
              type: 'PatronGroup',
              patronGroupId: 'patronGroupId',
            },
            value: {
              type: 'Constant',
              value: 'if',
            },
          },
        ],
        else: { type: 'Constant', value: 'else' },
      },
    ],
  ])('Converts %s into %s', (token, expected) =>
    expect(dataTokenToDto(token)).toEqual(expected)
  );

  test.each<[DataToken[] | undefined, BursarExportDataTokenDTO[]]>([
    [undefined, []],
    [[], []],
    [
      [{ type: DataTokenType.NEWLINE }, { type: DataTokenType.COMMA }],
      [
        { type: 'Constant', value: '\n' },
        { type: 'Constant', value: ',' },
      ],
    ],
  ])('Bulk converts %s into %s', (token, expected) =>
    expect(dataToDto(token)).toEqual(expected)
  );
});
