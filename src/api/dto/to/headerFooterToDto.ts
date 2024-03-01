import { ConvenientConstants, CriteriaTokenType, HeaderFooterToken, HeaderFooterTokenType } from '../../../types';
import { guardNumberPositive } from '../../../utils/guardNumber';
import { BursarExportHeaderFooterTokenDTO } from '../dto-types';
import lengthControlToDto from './lengthControlToDto';

export function headerFooterTokenToDto(token: HeaderFooterToken): BursarExportHeaderFooterTokenDTO {
  switch (token.type) {
    case HeaderFooterTokenType.NEWLINE:
    case HeaderFooterTokenType.NEWLINE_MICROSOFT:
    case HeaderFooterTokenType.TAB:
    case HeaderFooterTokenType.COMMA:
      return { type: 'Constant', value: ConvenientConstants[token.type] };

    case HeaderFooterTokenType.SPACE:
      return {
        type: 'Constant',
        value: ConvenientConstants[token.type].repeat(guardNumberPositive(token.repeat)),
      };

    case HeaderFooterTokenType.ARBITRARY_TEXT:
      return { type: 'Constant', value: token.text };

    case HeaderFooterTokenType.AGGREGATE_COUNT:
      return {
        type: 'Aggregate',
        value: CriteriaTokenType.NUM_ROWS,
        decimal: false,
        lengthControl: lengthControlToDto(token.lengthControl),
      };

    case HeaderFooterTokenType.AGGREGATE_TOTAL:
      return {
        type: 'Aggregate',
        value: CriteriaTokenType.TOTAL_AMOUNT,
        decimal: token.decimal,
        lengthControl: lengthControlToDto(token.lengthControl),
      };

    case HeaderFooterTokenType.CURRENT_DATE:
    default:
      return {
        type: 'CurrentDate',
        value: token.format,
        timezone: token.timezone,
        lengthControl: lengthControlToDto(token.lengthControl),
      };
  }
}

export default function headerFooterToDto(tokens: HeaderFooterToken[] | undefined): BursarExportHeaderFooterTokenDTO[] {
  if (tokens === undefined) {
    return [];
  }

  return tokens.map(headerFooterTokenToDto);
}
