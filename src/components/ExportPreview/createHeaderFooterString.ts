import { HeaderFooterToken, HeaderFooterTokenType } from '../../types';
import { applyDecimalFormat, applyLengthControl, formatDate } from '../../utils/exportPreviewUtils';
import { guardNumberPositive } from '../../utils/guardNumber';

export function tokenToString(token: HeaderFooterToken, amount: number, count: number): string {
  switch (token.type) {
    case HeaderFooterTokenType.ARBITRARY_TEXT:
      return token.text ?? '';
    case HeaderFooterTokenType.NEWLINE:
      return '\n';
    case HeaderFooterTokenType.NEWLINE_MICROSOFT:
      return '\r\n';
    case HeaderFooterTokenType.TAB:
      return '\t';
    case HeaderFooterTokenType.COMMA:
      return ',';
    case HeaderFooterTokenType.SPACE:
      return ' '.repeat(guardNumberPositive(token.repeat));

    case HeaderFooterTokenType.CURRENT_DATE:
      return applyLengthControl(
        formatDate(token.format, new Date()).toString(),
        token.lengthControl,
      );

    case HeaderFooterTokenType.AGGREGATE_TOTAL:
      return applyLengthControl(applyDecimalFormat(amount, token.decimal), token.lengthControl);

    case HeaderFooterTokenType.AGGREGATE_COUNT:
      return applyLengthControl(count.toString(), token.lengthControl);

    default:
      return '';
  }
}

export default function createHeaderFooterString(
  tokens: HeaderFooterToken[],
  totalAmount: number,
  totalCount: number,
): string {
  return tokens.map((token) => tokenToString(token, totalAmount, totalCount)).join('');
}
