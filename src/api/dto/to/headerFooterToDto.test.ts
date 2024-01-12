import {
  DateFormatType,
  HeaderFooterToken,
  HeaderFooterTokenType,
} from '../../../types/TokenTypes';
import { BursarExportHeaderFooterTokenDTO } from '../types';
import headerFooterToDto, { headerFooterTokenToDto } from './headerFooterToDto';

describe('Header/footer token conversion', () => {
  test.each<
    [HeaderFooterToken[] | undefined, BursarExportHeaderFooterTokenDTO[]]
  >([
    [undefined, []],
    [[], []],
    [
      [
        { type: HeaderFooterTokenType.NEWLINE },
        { type: HeaderFooterTokenType.NEWLINE_MICROSOFT },
      ],
      [
        { type: 'Constant', value: '\n' },
        { type: 'Constant', value: '\r\n' },
      ],
    ],
  ])('headerFooterToDto(%s) = %s', (input, expected) =>
    expect(headerFooterToDto(input)).toEqual(expected)
  );

  test.each<[HeaderFooterToken, BursarExportHeaderFooterTokenDTO]>([
    [
      { type: HeaderFooterTokenType.NEWLINE },
      { type: 'Constant', value: '\n' },
    ],
    [
      { type: HeaderFooterTokenType.NEWLINE_MICROSOFT },
      { type: 'Constant', value: '\r\n' },
    ],
    [{ type: HeaderFooterTokenType.TAB }, { type: 'Constant', value: '\t' }],
    [{ type: HeaderFooterTokenType.COMMA }, { type: 'Constant', value: ',' }],
    [
      { type: HeaderFooterTokenType.SPACE, repeat: '' },
      { type: 'Constant', value: '' },
    ],
    [
      { type: HeaderFooterTokenType.SPACE, repeat: '5' },
      { type: 'Constant', value: '     ' },
    ],
    [
      { type: HeaderFooterTokenType.ARBITRARY_TEXT, text: 'foo' },
      { type: 'Constant', value: 'foo' },
    ],

    [
      { type: HeaderFooterTokenType.AGGREGATE_COUNT },
      { type: 'Aggregate', value: 'NUM_ROWS', decimal: false },
    ],

    [
      { type: HeaderFooterTokenType.AGGREGATE_TOTAL, decimal: false },
      { type: 'Aggregate', value: 'TOTAL_AMOUNT', decimal: false },
    ],
    [
      { type: HeaderFooterTokenType.AGGREGATE_TOTAL, decimal: true },
      { type: 'Aggregate', value: 'TOTAL_AMOUNT', decimal: true },
    ],

    [
      {
        type: HeaderFooterTokenType.CURRENT_DATE,
        format: DateFormatType.YEAR_LONG,
        timezone: 'timezone',
      },
      { type: 'CurrentDate', value: 'YEAR_LONG', timezone: 'timezone' },
    ],
  ])('headerFooterTokenToDto(%s) = %s', (input, expected) =>
    expect(headerFooterTokenToDto(input)).toEqual(expected)
  );
});
