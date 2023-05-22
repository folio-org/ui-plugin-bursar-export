import { CriteriaGroup, CriteriaTerminal } from './CriteriaTypes';
import LengthControl from './LengthControl';

export enum HeaderFooterTokenType {
  ARBITRARY_TEXT = 'Constant',
  NEWLINE = 'Newline',
  NEWLINE_MICROSOFT = 'NewlineMicrosoft',
  TAB = 'Tab',
  COMMA = 'Comma',
  SPACE = 'Space',

  CURRENT_DATE = 'CurrentDate',
  AGGREGATE_COUNT = 'AggregateCount',
  AGGREGATE_TOTAL = 'AggregateTotal',
}

export enum DateFormatType {
  YEAR_LONG = 'YEAR_LONG',
  YEAR_SHORT = 'YEAR_SHORT',
  MONTH = 'MONTH',
  DATE = 'DATE',
  HOUR = 'HOUR',
  MINUTE = 'MINUTE',
  SECOND = 'SECOND',
  QUARTER = 'QUARTER',
  WEEK_OF_YEAR_ISO = 'WEEK_OF_YEAR_ISO',
  WEEK_YEAR_ISO = 'WEEK_YEAR_ISO',
}

export type HeaderFooterToken =
  | {
      type: HeaderFooterTokenType.NEWLINE;
    }
  | {
      type: HeaderFooterTokenType.NEWLINE_MICROSOFT;
    }
  | {
      type: HeaderFooterTokenType.TAB;
    }
  | {
      type: HeaderFooterTokenType.COMMA;
    }
  | {
      type: HeaderFooterTokenType.SPACE;
      repeat: string;
    }
  | {
      type: HeaderFooterTokenType.ARBITRARY_TEXT;
      text: string;
    }
  | {
      type: HeaderFooterTokenType.CURRENT_DATE;
      format: DateFormatType;
      timezone: string;
      lengthControl?: LengthControl;
    }
  | {
      type: HeaderFooterTokenType.AGGREGATE_COUNT;
      lengthControl?: LengthControl;
    }
  | {
      type: HeaderFooterTokenType.AGGREGATE_TOTAL;
      decimal: boolean;
      lengthControl?: LengthControl;
    };

export enum DataTokenType {
  ARBITRARY_TEXT = 'Constant',
  NEWLINE = 'Newline',
  NEWLINE_MICROSOFT = 'NewlineMicrosoft',
  TAB = 'Tab',
  COMMA = 'Comma',
  SPACE = 'Space',

  CURRENT_DATE = 'CurrentDate',

  ACCOUNT_AMOUNT = 'FeeAmount',
  ACCOUNT_DATE = 'FeeDate',
  FEE_FINE_TYPE = 'FeeFineMetadata',
  ITEM_INFO = 'ItemData',
  USER_DATA = 'UserData',

  CONSTANT_CONDITIONAL = 'ConstantConditional',
}

export type ItemAttributes =
  | 'BARCODE'
  | 'NAME'
  | 'MATERIAL_TYPE'
  | 'INSTITUTION_ID'
  | 'CAMPUS_ID'
  | 'LIBRARY_ID'
  | 'LOCATION_ID';
export type UserAttributes =
  | 'FOLIO_ID'
  | 'PATRON_GROUP_ID'
  | 'BARCODE'
  | 'USERNAME'
  | 'FIRST_NAME'
  | 'MIDDLE_NAME'
  | 'LAST_NAME';

export type DataToken =
  | {
      type: DataTokenType.NEWLINE;
    }
  | {
      type: DataTokenType.NEWLINE_MICROSOFT;
    }
  | {
      type: DataTokenType.TAB;
    }
  | {
      type: DataTokenType.COMMA;
    }
  | {
      type: DataTokenType.SPACE;
      repeat: string;
    }
  | {
      type: DataTokenType.ARBITRARY_TEXT;
      text: string;
    }
  | {
      type: DataTokenType.CURRENT_DATE;
      format: DateFormatType;
      timezone: string;
      lengthControl?: LengthControl;
    }
  | {
      type: DataTokenType.ACCOUNT_AMOUNT;
      decimal: boolean;
      lengthControl?: LengthControl;
    }
  | {
      type: DataTokenType.ACCOUNT_DATE;
      attribute: 'CREATED' | 'UPDATED' | 'DUE' | 'RETURNED';
      format: DateFormatType;
      timezone: string;
      placeholder: string;
      lengthControl?: LengthControl;
    }
  | {
      type: DataTokenType.FEE_FINE_TYPE;
      attribute: 'FEE_FINE_TYPE_ID' | 'FEE_FINE_TYPE_NAME';
      lengthControl?: LengthControl;
    }
  | {
      type: DataTokenType.ITEM_INFO;
      attribute: ItemAttributes;
      placeholder: string;
      lengthControl?: LengthControl;
    }
  | {
      type: DataTokenType.USER_DATA;
      attribute: UserAttributes;
      placeholder?: string;
      lengthControl?: LengthControl;
    }
  | {
      type: DataTokenType.CONSTANT_CONDITIONAL;
      conditions: {
        condition: CriteriaGroup | CriteriaTerminal;
        value: string;
      }[];
      else: string;
    };
