import {
  ComparisonOperator,
  CriteriaGroup,
  CriteriaGroupType,
  CriteriaTerminal,
  CriteriaTerminalType,
} from '../../../types/CriteriaTypes';
import { FeeFineTypeDTO } from '../../queries/useFeeFineTypes';
import { LocationDTO } from '../../queries/useLocations';
import {
  BursarExportFilterCondition,
  BursarExportFilterDTO,
  BursarExportFilterNegation,
} from '../types';

// inverse of ../to/criteriaToFilterDto
export default function dtoToCriteria(
  filter: BursarExportFilterDTO,
  feeFineTypes: FeeFineTypeDTO[],
  locations: LocationDTO[]
): CriteriaGroup | CriteriaTerminal {
  switch (filter.type) {
    case 'Age':
      return {
        type: CriteriaTerminalType.AGE,
        operator: filter.condition as ComparisonOperator,
        numDays: filter.numDays.toString(),
      };
    case 'Amount':
      return {
        type: CriteriaTerminalType.AMOUNT,
        operator: filter.condition as ComparisonOperator,
        amountDollars: (filter.amount / 100).toFixed(2),
      };
    case 'FeeFineOwner':
      return {
        type: CriteriaTerminalType.FEE_FINE_OWNER,
        feeFineOwnerId: filter.feeFineOwner,
      };
    case 'FeeType':
      return {
        type: CriteriaTerminalType.FEE_FINE_TYPE,
        feeFineTypeId: filter.feeFineTypeId,
        feeFineOwnerId: getFeeFineOwnerId(filter.feeFineTypeId, feeFineTypes),
      };
    case 'Location':
      return {
        type: CriteriaTerminalType.LOCATION,
        locationId: filter.locationId,
        ...getLocationProperties(filter.locationId, locations),
      };
    case 'PatronGroup':
      return {
        type: CriteriaTerminalType.PATRON_GROUP,
        patronGroupId: filter.patronGroupId,
      };
    case 'ServicePoint':
      return {
        type: CriteriaTerminalType.SERVICE_POINT,
        servicePointId: filter.servicePointId,
      };

    case 'Condition':
      return dtoToConditionCriteria(filter, feeFineTypes, locations);

    case 'Negation':
      return dtoToNegationCriteria(filter, feeFineTypes, locations);

    case 'Pass':
    default:
      return {
        type: CriteriaTerminalType.PASS,
      };
  }
}

export function dtoToConditionCriteria(
  filter: BursarExportFilterCondition,
  feeFineTypes: FeeFineTypeDTO[],
  locations: LocationDTO[]
): CriteriaGroup {
  if (filter.operation === 'AND') {
    return {
      type: CriteriaGroupType.ALL_OF,
      criteria: filter.criteria.map((criteria) =>
        dtoToCriteria(criteria, feeFineTypes, locations)
      ),
    };
  } else {
    return {
      type: CriteriaGroupType.ANY_OF,
      criteria: filter.criteria.map((criteria) =>
        dtoToCriteria(criteria, feeFineTypes, locations)
      ),
    };
  }
}

export function dtoToNegationCriteria(
  filter: BursarExportFilterNegation,
  feeFineTypes: FeeFineTypeDTO[],
  locations: LocationDTO[]
): CriteriaGroup {
  // NOR gets displayed as "None of" in the UI, so we flatten the inner OR
  if (
    filter.criteria.type === 'Condition' &&
    filter.criteria.operation === 'OR'
  ) {
    return {
      type: CriteriaGroupType.NONE_OF,
      criteria: filter.criteria.criteria.map((criteria) =>
        dtoToCriteria(criteria, feeFineTypes, locations)
      ),
    };
  }

  // otherwise, just negate the single inner criteria
  return {
    type: CriteriaGroupType.NONE_OF,
    criteria: [dtoToCriteria(filter.criteria, feeFineTypes, locations)],
  };
}

export function getFeeFineOwnerId(
  feeFineTypeId: string,
  feeFineTypes: FeeFineTypeDTO[]
) {
  const feeFineType = feeFineTypes.find((type) => type.id === feeFineTypeId);

  if (feeFineType?.ownerId) {
    return feeFineType.ownerId;
  }

  return 'automatic';
}

export function getLocationProperties(
  locationId: string,
  locations: LocationDTO[]
): Partial<CriteriaTerminal & { type: CriteriaTerminalType.LOCATION }> {
  const location = locations.find((loc) => loc.id === locationId);

  if (location === undefined) {
    return {};
  }

  return {
    institutionId: location.institutionId,
    campusId: location.campusId,
    libraryId: location.libraryId,
  };
}
