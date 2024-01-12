import ConvenientConstants from '../../../types/ConvenientConstants';
import {
  DateFormatType,
  HeaderFooterToken,
  HeaderFooterTokenType,
} from '../../../types/TokenTypes';
import {
  BursarExportHeaderFooterTokenDTO,
  BursarExportTokenAggregate,
  BursarExportTokenConstant,
} from '../types';
import dtoToLengthControl from './dtoToLengthControl';

// inverse of ../to/headerFooterToDto
export default function dtoToHeaderFooter(
  tokens: BursarExportHeaderFooterTokenDTO[] | undefined
): HeaderFooterToken[] {
  if (tokens === undefined) {
    return [];
  }
  return tokens.map(dtoToHeaderFooterToken);
}

export function dtoToHeaderFooterToken(
  token: BursarExportHeaderFooterTokenDTO
): HeaderFooterToken {
  switch (token.type) {
    case 'Constant':
      return constantToToken(token);

    case 'Aggregate':
      return aggregateToToken(token);

    case 'CurrentDate':
    default:
      return {
        type: HeaderFooterTokenType.CURRENT_DATE,
        format: token.value as DateFormatType,
        timezone: token.timezone,
        lengthControl: dtoToLengthControl(token.lengthControl),
      };
  }
}

export function constantToToken(
  token: BursarExportTokenConstant
): HeaderFooterToken {
  if (token.value === ConvenientConstants[HeaderFooterTokenType.NEWLINE]) {
    return { type: HeaderFooterTokenType.NEWLINE };
  } else if (
    token.value === ConvenientConstants[HeaderFooterTokenType.NEWLINE_MICROSOFT]
  ) {
    return { type: HeaderFooterTokenType.NEWLINE_MICROSOFT };
  } else if (token.value === ConvenientConstants[HeaderFooterTokenType.TAB]) {
    return { type: HeaderFooterTokenType.TAB };
  } else if (token.value === ConvenientConstants[HeaderFooterTokenType.COMMA]) {
    return { type: HeaderFooterTokenType.COMMA };
  } else if (/^ +$/.test(token.value)) {
    return {
      type: HeaderFooterTokenType.SPACE,
      repeat: token.value.length.toString(),
    };
  } else {
    return { type: HeaderFooterTokenType.ARBITRARY_TEXT, text: token.value };
  }
}

export function aggregateToToken(
  token: BursarExportTokenAggregate
): HeaderFooterToken {
  if (token.value === 'NUM_ROWS') {
    return {
      type: HeaderFooterTokenType.AGGREGATE_COUNT,
      lengthControl: dtoToLengthControl(token.lengthControl),
    };
  } else {
    return {
      type: HeaderFooterTokenType.AGGREGATE_TOTAL,
      decimal: token.decimal,
      lengthControl: dtoToLengthControl(token.lengthControl),
    };
  }
}
