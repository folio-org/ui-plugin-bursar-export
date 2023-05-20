export interface FormValues {
  scheduling: {
    frequency: SchedulingFrequency;
    interval?: number;
  };
  criteria: CriteriaGroup | CriteriaTerminal;
}

export enum SchedulingFrequency {
  Manual = 'NONE',
  Hours = 'HOUR',
  Days = 'DAY',
  Weeks = 'WEEK',
}

export interface CriteriaGroup {
  type: CriteriaCardGroupType;
  criteria?: (CriteriaGroup | CriteriaTerminal)[];
}

export enum ComparisonOperator {
  LESS_THAN_EQUAL = 'LESS_THAN_EQUAL',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN_EQUAL = 'GREATER_THAN_EQUAL',
  GREATER_THAN = 'GREATER_THAN',
}

export type CriteriaTerminal =
  | { type: CriteriaCardTerminalType.PASS }
  | {
      type: CriteriaCardTerminalType.AGE;
      numDays?: number;
    }
  | {
      type: CriteriaCardTerminalType.AMOUNT;
      operator?: ComparisonOperator;
      amountDollars?: number;
    }
  | {
      type: CriteriaCardTerminalType.FEE_FINE_TYPE;
      feeFineOwnerId?: string;
      feeFineTypeId?: string;
    }
  | {
      type: CriteriaCardTerminalType.LOCATION;
      institutionId?: string;
      campusId?: string;
      libraryId?: string;
      locationId?: string;
    }
  | {
      type: CriteriaCardTerminalType.SERVICE_POINT;
      servicePointId?: string;
    }
  | {
      type: CriteriaCardTerminalType.PATRON_GROUP;
      patronGroupId?: string;
    };

export enum CriteriaCardGroupType {
  ALL_OF = 'Condition-AND',
  ANY_OF = 'Condition-OR',
  NONE_OF = 'Condition-NOR',
}

export enum CriteriaCardTerminalType {
  PASS = 'Pass',

  AGE = 'Age',
  AMOUNT = 'Amount',
  FEE_FINE_TYPE = 'FeeType',
  LOCATION = 'Location',
  SERVICE_POINT = 'ServicePoint',
  PATRON_GROUP = 'PatronGroup',
}
