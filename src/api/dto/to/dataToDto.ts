import ConvenientConstants from '../../../types/ConvenientConstants';
import { DataToken, DataTokenType } from '../../../types/TokenTypes';
import { guardNumberPositive } from '../../../utils/guardNumber';
import { BursarExportDataTokenDTO } from '../types';
import criteriaToFilterDto from './criteriaToFilterDto';
import lengthControlToDto from './lengthControlToDto';

export default function dataToDto(
  tokens: DataToken[] | undefined
): BursarExportDataTokenDTO[] {
  if (tokens === undefined) {
    return [];
  }

  return tokens.map(dataTokenToDto);
}

export function dataTokenToDto(token: DataToken): BursarExportDataTokenDTO {
  switch (token.type) {
    case DataTokenType.NEWLINE:
    case DataTokenType.NEWLINE_MICROSOFT:
    case DataTokenType.TAB:
    case DataTokenType.COMMA:
      return { type: 'Constant', value: ConvenientConstants[token.type] };

    case DataTokenType.SPACE:
      return {
        type: 'Constant',
        value: ConvenientConstants[token.type].repeat(
          guardNumberPositive(token.repeat)
        ),
      };

    case DataTokenType.ARBITRARY_TEXT:
      return { type: 'Constant', value: token.text };

    case DataTokenType.AGGREGATE_COUNT:
      return {
        type: 'Aggregate',
        value: 'NUM_ROWS',
        decimal: false,
        lengthControl: lengthControlToDto(token.lengthControl),
      };

    case DataTokenType.AGGREGATE_TOTAL:
      return {
        type: 'Aggregate',
        value: 'TOTAL_AMOUNT',
        decimal: token.decimal,
        lengthControl: lengthControlToDto(token.lengthControl),
      };

    case DataTokenType.ACCOUNT_AMOUNT:
      return {
        type: 'FeeAmount',
        decimal: token.decimal,
        lengthControl: lengthControlToDto(token.lengthControl),
      };

    case DataTokenType.CURRENT_DATE:
      return {
        type: 'CurrentDate',
        value: token.format,
        timezone: token.timezone,
        lengthControl: lengthControlToDto(token.lengthControl),
      };

    case DataTokenType.ACCOUNT_DATE:
      return {
        type: 'FeeDate',
        property: token.dateProperty,
        value: token.format,
        placeholder: token.placeholder ?? '',
        timezone: token.timezone,
        lengthControl: lengthControlToDto(token.lengthControl),
      };

    case DataTokenType.FEE_FINE_TYPE:
      return {
        type: 'FeeMetadata',
        value: token.feeFineAttribute,
        lengthControl: lengthControlToDto(token.lengthControl),
      };

    case DataTokenType.ITEM_INFO:
      return {
        type: 'ItemData',
        value: token.itemAttribute,
        placeholder: token.placeholder ?? '',
        lengthControl: lengthControlToDto(token.lengthControl),
      };

    case DataTokenType.USER_DATA:
      return userDataToDto(token);

    case DataTokenType.CONSTANT_CONDITIONAL:
    default:
      return {
        type: 'Conditional',
        conditions: (token.conditions ?? []).map((condition) => ({
          condition: criteriaToFilterDto(condition),
          value: {
            type: 'Constant',
            value: condition.value,
          },
        })),
        else: {
          type: 'Constant',
          value: token.else,
        },
      };
  }
}

export function userDataToDto(
  token: DataToken & { type: DataTokenType.USER_DATA }
): BursarExportDataTokenDTO {
  if (token.userAttribute == 'FOLIO_ID') {
      return {
        type: 'UserData',
        value: token.userAttribute,
        lengthControl: lengthControlToDto(token.lengthControl),
      };

    // all others (barcode, username, human name) are optional
  } else {
    return {
      type: 'UserDataOptional',
      value: token.userAttribute,
      placeholder: token.placeholder ?? '',
      lengthControl: lengthControlToDto(token.lengthControl),
    };
  }
}
