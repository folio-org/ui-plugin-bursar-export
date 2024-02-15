import { StripesType } from '@folio/stripes/core';
import { IntlShape } from 'react-intl';
import {
  AndOrOperator,
  ComparisonOperator,
  CriteriaGroup,
  CriteriaGroupType,
  CriteriaTerminal,
  CriteriaTerminalType,
} from '../../../types/CriteriaTypes';
import { FeeFineTypeDTO } from '../../queries/useFeeFineTypes';
import { LocationDTO } from '../../queries/useLocations';
import { BursarExportFilterCondition, BursarExportFilterDTO, BursarExportFilterNegation } from '../types';

// inverse of ../to/criteriaToFilterDto
export default function dtoToCriteria(
  filter: BursarExportFilterDTO,
  feeFineTypes: FeeFineTypeDTO[],
  locations: LocationDTO[],
  stripes: StripesType,
  intl: IntlShape,
): CriteriaGroup | CriteriaTerminal {
  switch (filter.type) {
    case CriteriaTerminalType.AGE:
      return {
        type: CriteriaTerminalType.AGE,
        operator: filter.condition as ComparisonOperator,
        numDays: filter.numDays.toString(),
      };
    case CriteriaTerminalType.AMOUNT:
      return {
        type: CriteriaTerminalType.AMOUNT,
        operator: filter.condition as ComparisonOperator,
        amountCurrency: intl.formatNumber(filter.amount / 100, { style: 'currency', currency: stripes.currency }),
      };
    case CriteriaTerminalType.FEE_FINE_OWNER:
      return {
        type: CriteriaTerminalType.FEE_FINE_OWNER,
        feeFineOwnerId: filter.feeFineOwner,
      };
    case CriteriaTerminalType.FEE_FINE_TYPE:
      return {
        type: CriteriaTerminalType.FEE_FINE_TYPE,
        feeFineTypeId: filter.feeFineTypeId,
        feeFineOwnerId: getFeeFineOwnerId(filter.feeFineTypeId, feeFineTypes),
      };
    case CriteriaTerminalType.LOCATION:
      return {
        type: CriteriaTerminalType.LOCATION,
        locationId: filter.locationId,
        ...getLocationProperties(filter.locationId, locations),
      };
    case CriteriaTerminalType.PATRON_GROUP:
      return {
        type: CriteriaTerminalType.PATRON_GROUP,
        patronGroupId: filter.patronGroupId,
      };
    case CriteriaTerminalType.SERVICE_POINT:
      return {
        type: CriteriaTerminalType.SERVICE_POINT,
        servicePointId: filter.servicePointId,
      };

    case 'Condition':
      return dtoToConditionCriteria(filter, feeFineTypes, locations, stripes, intl);

    case 'Negation':
      return dtoToNegationCriteria(filter, feeFineTypes, locations, stripes, intl);

    case CriteriaTerminalType.PASS:
    default:
      return {
        type: CriteriaTerminalType.PASS,
      };
  }
}

export function dtoToConditionCriteria(
  filter: BursarExportFilterCondition,
  feeFineTypes: FeeFineTypeDTO[],
  locations: LocationDTO[],
  stripes: StripesType,
  intl: IntlShape,
): CriteriaGroup {
  if (filter.operation === AndOrOperator.AND) {
    return {
      type: CriteriaGroupType.ALL_OF,
      criteria: filter.criteria.map((criteria) => dtoToCriteria(criteria, feeFineTypes, locations, stripes, intl)),
    };
  } else {
    return {
      type: CriteriaGroupType.ANY_OF,
      criteria: filter.criteria.map((criteria) => dtoToCriteria(criteria, feeFineTypes, locations, stripes, intl)),
    };
  }
}

export function dtoToNegationCriteria(
  filter: BursarExportFilterNegation,
  feeFineTypes: FeeFineTypeDTO[],
  locations: LocationDTO[],
  stripes: StripesType,
  intl: IntlShape,
): CriteriaGroup {
  // NOR gets displayed as "None of" in the UI, so we flatten the inner OR
  if (filter.criteria.type === 'Condition' && filter.criteria.operation === AndOrOperator.OR) {
    return {
      type: CriteriaGroupType.NONE_OF,
      criteria: filter.criteria.criteria.map((criteria) => dtoToCriteria(criteria, feeFineTypes, locations, stripes, intl)),
    };
  }

  // otherwise, just negate the single inner criteria
  return {
    type: CriteriaGroupType.NONE_OF,
    criteria: [dtoToCriteria(filter.criteria, feeFineTypes, locations, stripes, intl)],
  };
}

export function getFeeFineOwnerId(feeFineTypeId: string, feeFineTypes: FeeFineTypeDTO[]) {
  const feeFineType = feeFineTypes.find((type) => type.id === feeFineTypeId);

  if (feeFineType?.ownerId) {
    return feeFineType.ownerId;
  }

  return 'automatic';
}

export function getLocationProperties(
  locationId: string,
  locations: LocationDTO[],
): Partial<CriteriaTerminal & { type: CriteriaTerminalType.LOCATION }> {
  const location = locations.find((loc) => loc.id === locationId);

  if (!location) {
    return {};
  }

  return {
    institutionId: location.institutionId,
    campusId: location.campusId,
    libraryId: location.libraryId,
  };
}
