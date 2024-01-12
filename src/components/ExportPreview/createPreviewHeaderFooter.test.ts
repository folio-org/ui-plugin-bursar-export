import {
  DateFormatType,
  HeaderFooterToken,
  HeaderFooterTokenType,
} from '../../types/TokenTypes';
import createPreviewHeaderFooter, {
  tokenToNode,
} from './createPreviewHeaderFooter';

describe('Preview data generation', () => {
  const TEST_AMOUNT = 12.34;
  const TEST_COUNT = 5;

  test.each([
    [{}, ''],
    [{ type: HeaderFooterTokenType.ARBITRARY_TEXT }, ''],
    [{ type: HeaderFooterTokenType.ARBITRARY_TEXT, text: 'foo' }, 'foo'],
    [{ type: HeaderFooterTokenType.NEWLINE }, '\n'],
    [{ type: HeaderFooterTokenType.NEWLINE_MICROSOFT }, '\r\n'],
    [{ type: HeaderFooterTokenType.TAB }, '\t'],
    [{ type: HeaderFooterTokenType.COMMA }, ','],
    [{ type: HeaderFooterTokenType.SPACE, repeat: '3' }, '   '],
    [
      {
        type: HeaderFooterTokenType.CURRENT_DATE,
        format: DateFormatType.YEAR_LONG,
      },
      new Date().getFullYear().toString(),
    ],
    [{ type: HeaderFooterTokenType.AGGREGATE_TOTAL, decimal: true }, '12.34'],
    [{ type: HeaderFooterTokenType.AGGREGATE_TOTAL, decimal: false }, '1234'],
    [{ type: HeaderFooterTokenType.AGGREGATE_COUNT }, '5'],
  ] as const)('tokenToNode(%o)=%s', (token, expected) =>
    expect(
      tokenToNode(token as HeaderFooterToken, TEST_AMOUNT, TEST_COUNT)
    ).toBe(expected)
  );

  test('createPreviewHeaderFooter works as expected', () =>
    expect(
      createPreviewHeaderFooter(
        [
          { type: HeaderFooterTokenType.AGGREGATE_COUNT },
          { type: HeaderFooterTokenType.COMMA },
          { type: HeaderFooterTokenType.AGGREGATE_TOTAL, decimal: true },
        ] as HeaderFooterToken[],
        12.34,
        5
      )
    ).toStrictEqual('5,12.34'));
});
