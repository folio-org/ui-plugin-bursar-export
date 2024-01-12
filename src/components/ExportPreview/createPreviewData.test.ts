import { CriteriaTerminalType } from '../../types/CriteriaTypes';
import {
  DataToken,
  DataTokenType,
  DateFormatType,
} from '../../types/TokenTypes';
import createPreviewData, {
  formatFeeFineToken,
  formatItemToken,
  formatUserToken,
  generateEntry,
  tokenToNode,
} from './createPreviewData';

jest.mock('@ngneat/falso', () => ({
  rand: jest.fn(([first]) => first),
  randFirstName: jest.fn(() => 'FIRST_NAME'),
  randFloat: jest.fn(() => 12.34),
  randLastName: jest.fn(() => 'LAST_NAME'),
  randNumber: jest.fn(() => 7),
  randPassword: jest.fn(() => 'ALPHANUMERIC'),
  randPastDate: jest.fn(() => new Date(2001, 0, 1)),
  randUserName: jest.fn(() => 'USERNAME'),
  randUuid: jest.fn(() => 'UUID'),
  randWord: jest.fn(() => 'WORD'),
  randTextRange: jest.fn(() => 'WORDS WORDS WORDS'),
}));

describe('Preview data generation', () => {
  test.each([
    ['FEE_FINE_TYPE_ID', 'UUID'],
    ['FEE_FINE_TYPE_NAME', 'WORD WORD'],
  ] as const)('formatFeeFineToken(%s)=%s', (type, expected) =>
    expect(formatFeeFineToken(type)).toBe(expected)
  );

  test.each([
    ['BARCODE', 'ALPHANUMERIC'],
    ['NAME', 'WORDS WORDS WORDS'],
    ['MATERIAL_TYPE', 'WORD'],
    ['LIBRARY_ID', 'UUID'],
  ] as const)('formatItemToken(%s)=%s', (type, expected) =>
    expect(formatItemToken(type)).toBe(expected)
  );

  test.each([
    ['FOLIO_ID', 'UUID'],
    ['BARCODE', 'ALPHANUMERIC'],
    ['EXTERNAL_SYSTEM_ID', 'ALPHANUMERIC'],
    ['USERNAME', 'USERNAME'],
    ['FIRST_NAME', 'FIRST_NAME'],
    ['MIDDLE_NAME', 'LAST_NAME'],
    ['LAST_NAME', 'LAST_NAME'],
  ] as const)('formatUserToken(%s)=%s', (type, expected) =>
    expect(formatUserToken(type)).toBe(expected)
  );

  const TEST_AMOUNT = 12.34;
  const TEST_COUNT = 5;

  test.each<[Partial<DataToken>, string]>([
    [{} as DataToken, ''],
    [{ type: DataTokenType.ARBITRARY_TEXT }, ''],
    [{ type: DataTokenType.ARBITRARY_TEXT, text: 'foo' }, 'foo'],
    [{ type: DataTokenType.NEWLINE }, '\n'],
    [{ type: DataTokenType.NEWLINE_MICROSOFT }, '\r\n'],
    [{ type: DataTokenType.TAB }, '\t'],
    [{ type: DataTokenType.COMMA }, ','],
    [{ type: DataTokenType.SPACE, repeat: '3' }, '   '],
    [
      { type: DataTokenType.CURRENT_DATE, format: DateFormatType.YEAR_LONG },
      new Date().getFullYear().toString(),
    ],
    [{ type: DataTokenType.AGGREGATE_TOTAL, decimal: true }, '12.34'],
    [{ type: DataTokenType.ACCOUNT_AMOUNT, decimal: false }, '1234'],
    [
      { type: DataTokenType.ACCOUNT_DATE, format: DateFormatType.YEAR_LONG },
      '2001',
    ],
    [
      {
        type: DataTokenType.FEE_FINE_TYPE,
        feeFineAttribute: 'FEE_FINE_TYPE_ID',
      },
      'UUID',
    ],
    [{ type: DataTokenType.ITEM_INFO }, 'UUID'],
    [
      { type: DataTokenType.USER_DATA, userAttribute: 'BARCODE' },
      'ALPHANUMERIC',
    ],
    [
      {
        type: DataTokenType.CONSTANT_CONDITIONAL,
        else: 'else',
      },
      'else',
    ],
    [
      {
        type: DataTokenType.CONSTANT_CONDITIONAL,
        conditions: [{ type: CriteriaTerminalType.PASS, value: 'foo' }],
        else: 'else',
      },
      'foo',
    ],
    [{ type: DataTokenType.AGGREGATE_COUNT }, '5'],
  ])('tokenToNode(%o)=%s', (token, expected) =>
    expect(tokenToNode(token as DataToken, TEST_AMOUNT, TEST_COUNT)).toBe(
      expected
    )
  );

  test.each([
    [true, 7, ['7', ',', '12.34']],
    [false, 1, ['1', ',', '12.34']],
  ])(
    'generateEntry(aggregate=%s) gives count=%s and elements=%s',
    (aggregate, expectedCount, expectedElements) =>
      expect(
        generateEntry(
          [
            { type: DataTokenType.AGGREGATE_COUNT },
            { type: DataTokenType.COMMA },
            { type: DataTokenType.AGGREGATE_TOTAL, decimal: true },
          ],
          aggregate
        )
      ).toStrictEqual({
        amount: 12.34,
        count: expectedCount,
        elements: expectedElements,
      })
  );

  test.each([
    [
      [
        { type: DataTokenType.AGGREGATE_COUNT },
        { type: DataTokenType.SPACE, repeat: 1 },
        { type: DataTokenType.AGGREGATE_TOTAL, decimal: true },
        { type: DataTokenType.COMMA },
      ],
      false,
      '1 12.34,'.repeat(7),
      7,
    ],
    [
      [
        { type: DataTokenType.AGGREGATE_COUNT },
        { type: DataTokenType.SPACE, repeat: 1 },
        { type: DataTokenType.AGGREGATE_TOTAL, decimal: true },
        { type: DataTokenType.COMMA },
      ],
      true,
      '7 12.34,'.repeat(7),
      7 * 7,
    ],
  ])(
    'createPreviewData(%s, %s) to be data=%s, count=%s',
    (tokens, aggregate, expectedData, expectedCount) => {
      expect(
        createPreviewData(tokens as DataToken[], aggregate)
      ).toHaveProperty('dataPreview', expectedData);
      expect(
        createPreviewData(tokens as DataToken[], aggregate)
      ).toHaveProperty('totalCount', expectedCount);

      // must round to test because floats
      expect(
        createPreviewData(tokens as DataToken[], aggregate).totalAmount.toFixed(
          2
        )
      ).toBe((12.34 * 7).toFixed(2));
    }
  );
});
