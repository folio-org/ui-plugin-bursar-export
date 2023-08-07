import { Weekday } from '../../utils/WeekdayUtils';

/**
 * Bursar export job schema
 */
export interface BursarExportJobDTO {
  /**
   * Filter for bursar export job
   */
  filter: BursarExportFilterDTO;
  groupByPatron: boolean;
  groupByPatronFilter?: BursarExportFilterAggregate;
  header?: BursarExportHeaderFooterTokenDTO[];
  data?: BursarExportDataTokenDTO[];
  footer?: BursarExportHeaderFooterTokenDTO[];
  transferInfo: BursarExportTransferCriteria;
}

export type BursarExportFilterDTO =
  | BursarExportFilterAge
  | BursarExportFilterAmount
  | BursarExportFilterFeeType
  | BursarExportFilterLocation
  | BursarExportFilterPatronGroup
  | BursarExportFilterServicePoint
  | BursarExportFilterCondition
  | BursarExportFilterNegation
  | BursarExportFilterPass
  | BursarExportFilterFeeFineOwner;

export type BursarExportHeaderFooterTokenDTO =
  | BursarExportTokenAggregate
  | BursarExportTokenConstant
  | BursarExportTokenCurrentDate;

export type BursarExportDataTokenDTO =
  | BursarExportTokenAggregate
  | BursarExportTokenConstant
  | BursarExportTokenCurrentDate
  | BursarExportTokenFeeDate
  | BursarExportTokenFeeAmount
  | BursarExportTokenFeeMetadata
  | BursarExportTokenItemData
  | BursarExportTokenUserData
  | BursarExportTokenUserDataOptional
  | BursarExportTokenConditional;

export type DateFormatType =
  | 'YEAR_LONG'
  | 'YEAR_SHORT'
  | 'MONTH'
  | 'DATE'
  | 'HOUR'
  | 'MINUTE'
  | 'SECOND'
  | 'QUARTER'
  | 'WEEK_OF_YEAR_ISO'
  | 'WEEK_YEAR_ISO'
  | 'DAY_OF_YEAR'
  | 'YYYYMMDD'
  | 'YYYY-MM-DD'
  | 'MMDDYYYY'
  | 'DDMMYYYY';

/**
 * Filter by fees older than certain number of days
 */
export interface BursarExportFilterAge {
  type: 'Age';
  numDays: number;
  condition:
    |'LESS_THAN_EQUAL'
    | 'LESS_THAN'
    | 'GREATER_THAN'
    | 'GREATER_THAN_EQUAL';
}
/**
 * Filter by fee amount
 */
export interface BursarExportFilterAmount {
  type: 'Amount';
  amount: number;
  condition:
    | 'LESS_THAN_EQUAL'
    | 'LESS_THAN'
    | 'GREATER_THAN'
    | 'GREATER_THAN_EQUAL';
}
/**
 * Filter by fee type
 */
export interface BursarExportFilterFeeType {
  type: 'FeeType';
  feeFineTypeId: string;
}
/**
 * Filter by location
 */
export interface BursarExportFilterLocation {
  type: 'Location';
  locationId: string;
}
/**
 * Filter by patron group
 */
export interface BursarExportFilterPatronGroup {
  type: 'PatronGroup';
  patronGroupId: string;
}
/**
 * Filter by service point
 */
export interface BursarExportFilterServicePoint {
  type: 'ServicePoint';
  servicePointId: string;
}
/**
 * Filter conditional operations
 */
export interface BursarExportFilterCondition {
  type: 'Condition';
  operation: 'AND' | 'OR';
  criteria: BursarExportFilterDTO[];
}
/**
 * Negation of filter for bursar export
 */
export interface BursarExportFilterNegation {
  type: 'Negation';
  /**
   * Filter for bursar export job
   */
  criteria: BursarExportFilterDTO;
}
/**
 * Filter that is always true
 */
export interface BursarExportFilterPass {
  type: 'Pass';
}
/**
 * Filter by fee fine owner
 */
export interface BursarExportFilterFeeFineOwner {
  type: 'FeeFineOwner';
  feeFineOwner: string;
}
/**
 * Filter by aggregate data
 */
export interface BursarExportFilterAggregate {
  type: 'Aggregate';
  property: 'NUM_ROWS' | 'TOTAL_AMOUNT';
  amount: number;
  condition:
    | 'LESS_THAN_EQUAL'
    | 'LESS_THAN'
    | 'GREATER_THAN'
    | 'GREATER_THAN_EQUAL';
}
/**
 * Token to represent aggregated result of multiple fees
 */
export interface BursarExportTokenAggregate {
  type: 'Aggregate';
  value: 'NUM_ROWS' | 'TOTAL_AMOUNT';
  /**
   * only applicable for total amount
   */
  decimal: boolean;
  lengthControl?: BursarExportTokenLengthControl;
}
/**
 * Token to fill in the length of another token
 */
export interface BursarExportTokenLengthControl {
  character: string;
  length: number;
  direction: 'FRONT' | 'BACK';
  truncate: boolean;
}
/**
 * Token to represent a constant used as an arbitrary string
 */
export interface BursarExportTokenConstant {
  type: 'Constant';
  value: string;
}
/**
 * Token to represent part of date
 */
export interface BursarExportTokenCurrentDate {
  type: 'CurrentDate';
  /**
   * Schema to represent the type of date information
   */
  value: DateFormatType;
  timezone: string;
  lengthControl?: BursarExportTokenLengthControl;
}
/**
 * Token to represent part of date about a fee
 */
export interface BursarExportTokenFeeDate {
  type: 'FeeDate';
  property: 'CREATED' | 'UPDATED' | 'DUE' | 'RETURNED';
  /**
   * Schema to represent the type of date information
   */
  value: DateFormatType;
  placeholder: string;
  timezone: string;
  lengthControl?: BursarExportTokenLengthControl;
}
/**
 * Token to represent fee amount
 */
export interface BursarExportTokenFeeAmount {
  type: 'FeeAmount';
  decimal: boolean;
  lengthControl?: BursarExportTokenLengthControl;
}
/**
 * Token to represent fee metadata
 */
export interface BursarExportTokenFeeMetadata {
  type: 'FeeMetadata';
  value: 'FEE_FINE_TYPE_ID' | 'FEE_FINE_TYPE_NAME';
  lengthControl?: BursarExportTokenLengthControl;
}

export type ItemDataType =
  | 'BARCODE'
  | 'NAME'
  | 'MATERIAL_TYPE'
  | 'INSTITUTION_ID'
  | 'CAMPUS_ID'
  | 'LIBRARY_ID'
  | 'LOCATION_ID';

/**
 * Token to represent item data
 */
export interface BursarExportTokenItemData {
  type: 'ItemData';
  value: ItemDataType;
  placeholder: string;
  lengthControl?: BursarExportTokenLengthControl;
}
/**
 * Token to represent user data
 */
export interface BursarExportTokenUserData {
  type: 'UserData';
  value: 'FOLIO_ID'
  lengthControl?: BursarExportTokenLengthControl;
}
export type UserDataOptionalType =
  | 'BARCODE'
  | 'USERNAME'
  | 'FIRST_NAME'
  | 'MIDDLE_NAME'
  | 'LAST_NAME'
  | 'PATRON_GROUP_ID'
  | 'EXTERNAL_SYSTEM_ID';
/**
 * Token to represent optional user data
 */
export interface BursarExportTokenUserDataOptional {
  type: 'UserDataOptional';
  value: UserDataOptionalType;
  placeholder: string;
  lengthControl?: BursarExportTokenLengthControl;
}
/**
 * Token to represent other data tokens depending on certain conditions
 */
export interface BursarExportTokenConditional {
  type: 'Conditional';
  conditions: {
    /**
     * Filter for bursar export job
     */
    condition: BursarExportFilterDTO;
    /**
     * Usable token for bursar export
     */
    value: BursarExportTokenConstant;
  }[];
  /**
   * Usable token for bursar export
   */
  else: BursarExportTokenConstant;
}
/**
 * Transfer criteria
 */
export interface BursarExportTransferCriteria {
  conditions?: {
    /**
     * Filter for bursar export job
     */
    condition: BursarExportFilterDTO;
    account: string;
  }[];
  /**
   * account to transfer fees/fines that do not meet any specified conditions to
   */
  else: {
    account: string;
  };
}

// from mod-data-export-spring
export interface SchedulingDTO {
  schedulePeriod: 'NONE' | 'HOUR' | 'DAY' | 'WEEK';
  scheduleFrequency?: number;
  /** straight from timepicker, for DAY and WEEK only  */
  scheduleTime?: string;
  weekDays?: Weekday[];
}

export interface SavedJobDTO extends SchedulingDTO {
  id: string;
  type: 'BURSAR_FEES_FINES';
  tenant: string;

  exportTypeSpecificParameters: {
    bursarFeeFines: BursarExportJobDTO;
  };
}

// for coverage
export const TYPE_ONLY = true;
