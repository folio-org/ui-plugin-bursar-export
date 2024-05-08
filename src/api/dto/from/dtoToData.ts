import { StripesType } from '@folio/stripes/core';
import { IntlShape } from 'react-intl';
import {
  ConvenientConstants,
  CriteriaTokenType,
  DataToken,
  DataTokenType,
  DateFormatType,
} from '../../../types';
import { FeeFineTypeDTO } from '../../queries/useFeeFineTypes';
import { LocationDTO } from '../../queries/useLocations';
import {
  BursarExportDataTokenDTO,
  BursarExportTokenAggregate,
  BursarExportTokenConstant,
} from '../dto-types';
import dtoToCriteria from './dtoToCriteria';
import dtoToLengthControl from './dtoToLengthControl';

export function constantToToken(token: BursarExportTokenConstant): DataToken {
  if (token.value === ConvenientConstants[DataTokenType.NEWLINE]) {
    return { type: DataTokenType.NEWLINE };
  } else if (token.value === ConvenientConstants[DataTokenType.NEWLINE_MICROSOFT]) {
    return { type: DataTokenType.NEWLINE_MICROSOFT };
  } else if (token.value === ConvenientConstants[DataTokenType.TAB]) {
    return { type: DataTokenType.TAB };
  } else if (token.value === ConvenientConstants[DataTokenType.COMMA]) {
    return { type: DataTokenType.COMMA };
  } else if (/^ +$/.test(token.value)) {
    return {
      type: DataTokenType.SPACE,
      repeat: token.value.length.toString(),
    };
  } else {
    return { type: DataTokenType.ARBITRARY_TEXT, text: token.value };
  }
}

export function aggregateToToken(token: BursarExportTokenAggregate): DataToken {
  if (token.value === CriteriaTokenType.NUM_ROWS) {
    return {
      type: DataTokenType.AGGREGATE_COUNT,
      lengthControl: dtoToLengthControl(token.lengthControl),
    };
  } else {
    return {
      type: DataTokenType.AGGREGATE_TOTAL,
      decimal: token.decimal,
      lengthControl: dtoToLengthControl(token.lengthControl),
    };
  }
}

export function dtoToDataToken(
  token: BursarExportDataTokenDTO,
  feeFineTypes: FeeFineTypeDTO[],
  locations: LocationDTO[],
  stripes: StripesType,
  intl: IntlShape,
): DataToken {
  switch (token.type) {
    case 'Constant':
      return constantToToken(token);

    case 'Aggregate':
      return aggregateToToken(token);

    case 'CurrentDate':
      return {
        type: DataTokenType.CURRENT_DATE,
        format: token.value as DateFormatType,
        timezone: token.timezone,
        lengthControl: dtoToLengthControl(token.lengthControl),
      };

    case 'FeeAmount':
      return {
        type: DataTokenType.ACCOUNT_AMOUNT,
        decimal: token.decimal,
        lengthControl: dtoToLengthControl(token.lengthControl),
      };

    case 'FeeDate':
      return {
        type: DataTokenType.ACCOUNT_DATE,
        format: token.value as DateFormatType,
        timezone: token.timezone,
        placeholder: token.placeholder,
        dateProperty: token.property,
        lengthControl: dtoToLengthControl(token.lengthControl),
      };

    case 'FeeMetadata':
      return {
        type: DataTokenType.FEE_FINE_TYPE,
        feeFineAttribute: token.value,
        lengthControl: dtoToLengthControl(token.lengthControl),
      };

    case 'ItemData':
      return {
        type: DataTokenType.ITEM_INFO,
        itemAttribute: token.value,
        placeholder: token.placeholder,
        lengthControl: dtoToLengthControl(token.lengthControl),
      };

    case 'UserData':
      return {
        type: DataTokenType.USER_DATA,
        userAttribute: token.value,
        lengthControl: dtoToLengthControl(token.lengthControl),
      };

    case 'UserDataOptional':
      return {
        type: DataTokenType.USER_DATA,
        userAttribute: token.value,
        placeholder: token.placeholder,
        lengthControl: dtoToLengthControl(token.lengthControl),
      };

    case 'Conditional':
    default: {
      const curConditions = Array.isArray(token.conditions) ?
        token.conditions.map(condition => ({
          ...dtoToCriteria(condition.condition, feeFineTypes, locations, stripes, intl), value: condition.value.value
        })) : [];

      return {
        type: DataTokenType.CONSTANT_CONDITIONAL,
        conditions: curConditions,
        else: token.else.value,
      };
    }
  }
}

// inverse of ../to/dataToDto
export default function dtoToData(
  tokens: BursarExportDataTokenDTO[] | undefined,
  feeFineTypes: FeeFineTypeDTO[],
  locations: LocationDTO[],
  stripes: StripesType,
  intl: IntlShape,
): DataToken[] {
  if (!tokens) {
    return [];
  }

  return tokens.map((token) => dtoToDataToken(token, feeFineTypes, locations, stripes, intl));
}
