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
  BursarExportFilterDTO,
  BursarExportFilterFeeFineOwner,
  BursarExportFilterFeeType,
  BursarExportFilterLocation,
  BursarExportFilterNegation,
} from '../types';
import dtoToCriteria from './dtoToCriteria';

describe('DTO to criteria conversion for initial values', () => {
  it.each<[BursarExportFilterDTO, CriteriaGroup | CriteriaTerminal]>([
    [
      { type: 'Age', condition: 'LESS_THAN', numDays: 1 },
      {
        type: CriteriaTerminalType.AGE,
        operator: ComparisonOperator.LESS_THAN,
        numDays: '1'
      },
    ],
    [
      { type: 'Amount', condition: 'LESS_THAN', amount: 124 },
      {
        type: CriteriaTerminalType.AMOUNT,
        operator: ComparisonOperator.LESS_THAN,
        amountDollars: '1.24',
      },
    ],
    [
      { type: 'FeeFineOwner', feeFineOwner: 'owner-id' },
      { type: CriteriaTerminalType.FEE_FINE_OWNER, feeFineOwnerId: 'owner-id' },
    ],
    [
      { type: 'PatronGroup', patronGroupId: 'pg-id' },
      { type: CriteriaTerminalType.PATRON_GROUP, patronGroupId: 'pg-id' },
    ],
    [
      { type: 'ServicePoint', servicePointId: 'sp-id' },
      { type: CriteriaTerminalType.SERVICE_POINT, servicePointId: 'sp-id' },
    ],
    [{ type: 'Pass' }, { type: CriteriaTerminalType.PASS }],
  ])('converts simple criteria %s to %s', (input, expected) =>
    expect(dtoToCriteria(input, [], [])).toEqual(expected)
  );

  it.each<[BursarExportFilterDTO, CriteriaGroup]>([
    [
      {
        type: 'Condition',
        operation: 'AND',
        criteria: [{ type: 'PatronGroup', patronGroupId: 'pg-id' }],
      },
      {
        type: CriteriaGroupType.ALL_OF,
        criteria: [
          { type: CriteriaTerminalType.PATRON_GROUP, patronGroupId: 'pg-id' },
        ],
      },
    ],
    [
      {
        type: 'Condition',
        operation: 'OR',
        criteria: [{ type: 'PatronGroup', patronGroupId: 'pg-id' }],
      },
      {
        type: CriteriaGroupType.ANY_OF,
        criteria: [
          { type: CriteriaTerminalType.PATRON_GROUP, patronGroupId: 'pg-id' },
        ],
      },
    ],
  ])('converts condition %s to %s', (input, expected) =>
    expect(dtoToCriteria(input, [], [])).toEqual(expected)
  );

  it.each<[BursarExportFilterNegation, CriteriaGroup]>([
    [
      {
        type: 'Negation',
        criteria: { type: 'PatronGroup', patronGroupId: 'pg-id' },
      },
      {
        type: CriteriaGroupType.NONE_OF,
        criteria: [
          { type: CriteriaTerminalType.PATRON_GROUP, patronGroupId: 'pg-id' },
        ],
      },
    ],
    [
      {
        type: 'Negation',
        criteria: {
          type: 'Condition',
          operation: 'AND',
          criteria: [{ type: 'PatronGroup', patronGroupId: 'pg-id' }],
        },
      },
      {
        type: CriteriaGroupType.NONE_OF,
        criteria: [
          {
            type: CriteriaGroupType.ALL_OF,
            criteria: [
              {
                type: CriteriaTerminalType.PATRON_GROUP,
                patronGroupId: 'pg-id',
              },
            ],
          },
        ],
      },
    ],
    [
      {
        type: 'Negation',
        criteria: {
          type: 'Condition',
          operation: 'OR',
          criteria: [{ type: 'PatronGroup', patronGroupId: 'pg-id' }],
        },
      },
      {
        type: CriteriaGroupType.NONE_OF,
        criteria: [
          { type: CriteriaTerminalType.PATRON_GROUP, patronGroupId: 'pg-id' },
        ],
      },
    ],
  ])('converts negation %s to %s', (input, expected) =>
    expect(dtoToCriteria(input, [], [])).toEqual(expected)
  );

  it.each<[BursarExportFilterFeeType, FeeFineTypeDTO[], CriteriaTerminal]>([
    [
      { type: 'FeeType', feeFineTypeId: 'fee-fine-type-id' },
      [],
      {
        type: CriteriaTerminalType.FEE_FINE_TYPE,
        feeFineTypeId: 'fee-fine-type-id',
        feeFineOwnerId: 'automatic',
      },
    ],
    [
      { type: 'FeeType', feeFineTypeId: 'fee-fine-type-id' },
      [{ id: 'fee-fine-type-id' } as FeeFineTypeDTO],
      {
        type: CriteriaTerminalType.FEE_FINE_TYPE,
        feeFineTypeId: 'fee-fine-type-id',
        feeFineOwnerId: 'automatic',
      },
    ],
    [
      { type: 'FeeType', feeFineTypeId: 'fee-fine-type-id' },
      [{ id: 'fee-fine-type-id', ownerId: 'owner-id' } as FeeFineTypeDTO],
      {
        type: CriteriaTerminalType.FEE_FINE_TYPE,
        feeFineTypeId: 'fee-fine-type-id',
        feeFineOwnerId: 'owner-id',
      },
    ],
  ])(
    'converts fee type %s with known types %s to %s',
    (input, feeFineTypes, expected) =>
      expect(dtoToCriteria(input, feeFineTypes, [])).toEqual(expected)
  );

  it.each<[BursarExportFilterLocation, LocationDTO[], CriteriaTerminal]>([
    [
      { type: 'Location', locationId: 'location-id' },
      [],
      {
        type: CriteriaTerminalType.LOCATION,
        locationId: 'location-id',
      },
    ],
    [
      { type: 'Location', locationId: 'location-id' },
      [{ id: 'location-id' } as LocationDTO],
      {
        type: CriteriaTerminalType.LOCATION,
        locationId: 'location-id',
      },
    ],
    [
      { type: 'Location', locationId: 'location-id' },
      [
        {
          id: 'location-id',
          institutionId: 'institution-id',
          campusId: 'campus-id',
          libraryId: 'library-id',
        } as LocationDTO,
      ],
      {
        type: CriteriaTerminalType.LOCATION,
        institutionId: 'institution-id',
        campusId: 'campus-id',
        libraryId: 'library-id',
        locationId: 'location-id',
      },
    ],
  ])(
    'converts location %s with known locations %s to %s',
    (input, locations, expected) =>
      expect(dtoToCriteria(input, [], locations)).toEqual(expected)
  );
});
