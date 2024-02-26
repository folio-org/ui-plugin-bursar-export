import {
  AndOrOperator,
  CriteriaGroup,
  CriteriaGroupType,
  CriteriaTerminal,
  CriteriaTerminalType,
} from '../../../types';
import guardNumber from '../../../utils/guardNumber';
import { BursarExportFilterDTO } from '../dto-types';

export default function criteriaToFilterDto(criteria?: CriteriaGroup | CriteriaTerminal): BursarExportFilterDTO {
  switch (criteria?.type) {
    case CriteriaTerminalType.AGE:
      return {
        type: 'Age',
        condition: criteria.operator ?? 'LESS_THAN_EQUAL',
        numDays: guardNumber(criteria.numDays, 0),
      };

    case CriteriaTerminalType.AMOUNT:
      return {
        type: 'Amount',
        condition: criteria.operator ?? 'LESS_THAN_EQUAL',
        amount: guardNumber(criteria.amountCurrency, 0, (v) => v * 100),
      };

    case CriteriaTerminalType.FEE_FINE_TYPE:
      return {
        type: 'FeeType',
        feeFineTypeId: criteria.feeFineTypeId ?? '',
      };

    case CriteriaTerminalType.FEE_FINE_OWNER:
      return {
        type: 'FeeFineOwner',
        feeFineOwner: criteria.feeFineOwnerId ?? '',
      };

    case CriteriaTerminalType.LOCATION:
      return {
        type: 'Location',
        locationId: criteria.locationId ?? '',
      };

    case CriteriaTerminalType.PATRON_GROUP:
      return {
        type: 'PatronGroup',
        patronGroupId: criteria.patronGroupId ?? '',
      };

    case CriteriaTerminalType.SERVICE_POINT:
      return {
        type: 'ServicePoint',
        servicePointId: criteria.servicePointId ?? '',
      };

    case CriteriaGroupType.ALL_OF:
    case CriteriaGroupType.ANY_OF:
    case CriteriaGroupType.NONE_OF:
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return groupToFilterDto(criteria);

    case CriteriaTerminalType.PASS:
    default:
      return { type: 'Pass' };
  }
}

export function groupToFilterDto(criteria: CriteriaGroup): BursarExportFilterDTO {
  const criteriaList = criteria.criteria ?? [];

  if (criteria.type === CriteriaGroupType.ALL_OF) {
    return {
      type: 'Condition',
      operation: AndOrOperator.AND,
      criteria: criteriaList.map(criteriaToFilterDto),
    };
  }
  if (criteria.type === CriteriaGroupType.ANY_OF) {
    return {
      type: 'Condition',
      operation: AndOrOperator.OR,
      criteria: criteriaList.map(criteriaToFilterDto),
    };
  }

  if (criteriaList.length === 1) {
    return {
      type: 'Negation',
      criteria: criteriaToFilterDto(criteriaList[0]),
    };
  }

  return {
    type: 'Negation',
    criteria: {
      type: 'Condition',
      operation: AndOrOperator.OR,
      criteria: criteriaList.map(criteriaToFilterDto),
    },
  };
}
