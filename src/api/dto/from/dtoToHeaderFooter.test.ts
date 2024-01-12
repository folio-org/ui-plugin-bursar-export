import { CriteriaTerminalType } from '../../../types/CriteriaTypes';
import {
  HeaderFooterToken,
  HeaderFooterTokenType,
  DateFormatType,
} from '../../../types/TokenTypes';
import { BursarExportHeaderFooterTokenDTO } from '../types';
import dtoToHeaderFooter, { dtoToHeaderFooterToken } from './dtoToHeaderFooter';

describe('DTO to header/footer conversion for initial values', () => {
  it.each<[BursarExportHeaderFooterTokenDTO, HeaderFooterToken]>([
    [
      { type: 'Constant', value: '\n' },
      { type: HeaderFooterTokenType.NEWLINE },
    ],
    [
      { type: 'Constant', value: '\r\n' },
      { type: HeaderFooterTokenType.NEWLINE_MICROSOFT },
    ],
    [{ type: 'Constant', value: ',' }, { type: HeaderFooterTokenType.COMMA }],
    [{ type: 'Constant', value: '\t' }, { type: HeaderFooterTokenType.TAB }],
    [
      { type: 'Constant', value: '   ' },
      { type: HeaderFooterTokenType.SPACE, repeat: '3' },
    ],
    [
      { type: 'Constant', value: 'foo' },
      { type: HeaderFooterTokenType.ARBITRARY_TEXT, text: 'foo' },
    ],

    [
      { type: 'Aggregate', value: 'NUM_ROWS', decimal: false },
      { type: HeaderFooterTokenType.AGGREGATE_COUNT },
    ],
    [
      { type: 'Aggregate', value: 'TOTAL_AMOUNT', decimal: false },
      { type: HeaderFooterTokenType.AGGREGATE_TOTAL, decimal: false },
    ],
    [
      { type: 'Aggregate', value: 'TOTAL_AMOUNT', decimal: true },
      { type: HeaderFooterTokenType.AGGREGATE_TOTAL, decimal: true },
    ],

    [
      { type: 'CurrentDate', value: 'YEAR_LONG', timezone: 'somewhere' },
      {
        type: HeaderFooterTokenType.CURRENT_DATE,
        format: DateFormatType.YEAR_LONG,
        timezone: 'somewhere',
      },
    ],
  ])('converts token %s to %s', (input, expected) =>
    expect(dtoToHeaderFooterToken(input)).toEqual(expected)
  );

  it('converts undefined to empty array', () =>
    expect(dtoToHeaderFooter(undefined)).toEqual([]));

  it('converts token array to form value array', () =>
    expect(
      dtoToHeaderFooter([
        { type: 'Constant', value: '\n' },
        { type: 'Constant', value: '\r\n' },
        { type: 'Constant', value: ',' },
        { type: 'Constant', value: '\t' },
        { type: 'Constant', value: '   ' },
        { type: 'Constant', value: 'foo' },
      ])
    ).toEqual([
      { type: HeaderFooterTokenType.NEWLINE },
      { type: HeaderFooterTokenType.NEWLINE_MICROSOFT },
      { type: HeaderFooterTokenType.COMMA },
      { type: HeaderFooterTokenType.TAB },
      { type: HeaderFooterTokenType.SPACE, repeat: '3' },
      { type: HeaderFooterTokenType.ARBITRARY_TEXT, text: 'foo' },
    ]));
});
