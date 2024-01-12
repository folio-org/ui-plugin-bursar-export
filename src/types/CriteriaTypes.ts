export interface CriteriaGroup {
  type: CriteriaGroupType;
  criteria?: (CriteriaGroup | CriteriaTerminal)[];
}

export enum ComparisonOperator {
  LESS_THAN_EQUAL = 'LESS_THAN_EQUAL',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN_EQUAL = 'GREATER_THAN_EQUAL',
  GREATER_THAN = 'GREATER_THAN',
}

export type CriteriaTerminal =
  | { type: CriteriaTerminalType.PASS }
  | {
      type: CriteriaTerminalType.AGE;
      operator?: ComparisonOperator;
      numDays?: string;
    }
  | {
      type: CriteriaTerminalType.AMOUNT;
      operator?: ComparisonOperator;
      amountDollars?: string;
    }
  | {
      type: CriteriaTerminalType.FEE_FINE_OWNER;
      feeFineOwnerId?: string;
    }
  | {
      type: CriteriaTerminalType.FEE_FINE_TYPE;
      feeFineOwnerId?: string;
      feeFineTypeId?: string;
    }
  | {
      type: CriteriaTerminalType.LOCATION;
      institutionId?: string;
      campusId?: string;
      libraryId?: string;
      locationId?: string;
    }
  | {
      type: CriteriaTerminalType.SERVICE_POINT;
      servicePointId?: string;
    }
  | {
      type: CriteriaTerminalType.PATRON_GROUP;
      patronGroupId?: string;
    };

export type CriteriaAggregate =
  | {
      type: CriteriaAggregateType.PASS;
    }
  | {
      type: CriteriaAggregateType.NUM_ROWS;
      operator?: ComparisonOperator;
      amount?: string;
    }
  | {
      type: CriteriaAggregateType.TOTAL_AMOUNT;
      operator?: ComparisonOperator;
      amountDollars?: string;
    };

export enum CriteriaGroupType {
  ALL_OF = 'Condition-AND',
  ANY_OF = 'Condition-OR',
  NONE_OF = 'Condition-NOR',
}

export enum CriteriaTerminalType {
  PASS = 'Pass',

  AGE = 'Age',
  AMOUNT = 'Amount',
  FEE_FINE_OWNER = 'FeeFineOwner',
  FEE_FINE_TYPE = 'FeeType',
  LOCATION = 'Location',
  SERVICE_POINT = 'ServicePoint',
  PATRON_GROUP = 'PatronGroup',
}

export enum CriteriaAggregateType {
  PASS = 'Pass',
  NUM_ROWS = 'NumRows',
  TOTAL_AMOUNT = 'TotalAmount',
}
