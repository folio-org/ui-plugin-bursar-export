import {
  ComparisonOperator,
  CriteriaGroup,
  CriteriaGroupType,
  CriteriaTerminal,
  CriteriaTerminalType,
} from '../../../types/CriteriaTypes';
import { BursarExportFilterDTO } from '../types';
import criteriaToFilterDto from './criteriaToFilterDto';

describe('Conversion of form values to filter DTO', () => {
  it.each<
    [CriteriaGroup | CriteriaTerminal | undefined, BursarExportFilterDTO]
  >([
    [
      { type: CriteriaTerminalType.AGE, numDays: '1' },
      { type: 'Age', numDays: 1 },
    ],

    [
      { type: CriteriaTerminalType.AMOUNT, amountDollars: '12.34' },
      { type: 'Amount', condition: 'LESS_THAN_EQUAL', amount: 1234 },
    ],
    [
      {
        type: CriteriaTerminalType.AMOUNT,
        operator: ComparisonOperator.GREATER_THAN,
        amountDollars: '12.34',
      },
      { type: 'Amount', condition: 'GREATER_THAN', amount: 1234 },
    ],

    [
      { type: CriteriaTerminalType.FEE_FINE_TYPE },
      { type: 'FeeType', feeFineTypeId: '' },
    ],
    [
      {
        type: CriteriaTerminalType.FEE_FINE_TYPE,
        feeFineTypeId: 'fee-fine-type-id',
      },
      { type: 'FeeType', feeFineTypeId: 'fee-fine-type-id' },
    ],

    [
      { type: CriteriaTerminalType.FEE_FINE_OWNER },
      { type: 'FeeFineOwner', feeFineOwner: '' },
    ],
    [
      {
        type: CriteriaTerminalType.FEE_FINE_OWNER,
        feeFineOwnerId: 'fee-fine-owner-id',
      },
      { type: 'FeeFineOwner', feeFineOwner: 'fee-fine-owner-id' },
    ],

    [
      { type: CriteriaTerminalType.LOCATION },
      { type: 'Location', locationId: '' },
    ],
    [
      {
        type: CriteriaTerminalType.LOCATION,
        locationId: 'location-id',
      },
      { type: 'Location', locationId: 'location-id' },
    ],

    [
      { type: CriteriaTerminalType.PATRON_GROUP },
      { type: 'PatronGroup', patronGroupId: '' },
    ],
    [
      {
        type: CriteriaTerminalType.PATRON_GROUP,
        patronGroupId: 'patron-group-id',
      },
      { type: 'PatronGroup', patronGroupId: 'patron-group-id' },
    ],

    [
      { type: CriteriaTerminalType.PATRON_GROUP },
      { type: 'PatronGroup', patronGroupId: '' },
    ],
    [
      {
        type: CriteriaTerminalType.PATRON_GROUP,
        patronGroupId: 'patron-group-id',
      },
      { type: 'PatronGroup', patronGroupId: 'patron-group-id' },
    ],

    [
      { type: CriteriaTerminalType.SERVICE_POINT },
      { type: 'ServicePoint', servicePointId: '' },
    ],
    [
      {
        type: CriteriaTerminalType.SERVICE_POINT,
        servicePointId: 'service-point-id',
      },
      { type: 'ServicePoint', servicePointId: 'service-point-id' },
    ],

    [undefined, { type: 'Pass' }],
    [{ type: CriteriaTerminalType.PASS }, { type: 'Pass' }],
    [{ type: 'invalid' } as unknown as CriteriaTerminal, { type: 'Pass' }],
  ])('converts %s into %s', (input, expected) =>
    expect(criteriaToFilterDto(input)).toEqual(expected)
  );

  it.each<[CriteriaGroup, BursarExportFilterDTO]>([
    [
      { type: CriteriaGroupType.ALL_OF },
      { type: 'Condition', operation: 'AND', criteria: [] },
    ],
    [
      { type: CriteriaGroupType.ANY_OF },
      { type: 'Condition', operation: 'OR', criteria: [] },
    ],
    [
      { type: CriteriaGroupType.NONE_OF },
      {
        type: 'Negation',
        criteria: {
          type: 'Condition',
          operation: 'OR',
          criteria: [],
        },
      },
    ],

    [
      {
        type: CriteriaGroupType.ALL_OF,
        criteria: [
          { type: CriteriaTerminalType.AGE, numDays: '12' },
          {
            type: CriteriaTerminalType.PATRON_GROUP,
            patronGroupId: 'patron-group-id',
          },
        ],
      },
      {
        type: 'Condition',
        operation: 'AND',
        criteria: [
          { type: 'Age', numDays: 12 },
          {
            type: 'PatronGroup',
            patronGroupId: 'patron-group-id',
          },
        ],
      },
    ],

    [
      {
        type: CriteriaGroupType.NONE_OF,
        criteria: [
          {
            type: CriteriaTerminalType.SERVICE_POINT,
            servicePointId: 'service-point-id',
          },
        ],
      },
      {
        type: 'Negation',
        criteria: {
          type: 'ServicePoint',
          servicePointId: 'service-point-id',
        },
      },
    ],

    [
      {
        type: CriteriaGroupType.NONE_OF,
        criteria: [
          { type: CriteriaTerminalType.AGE, numDays: '12' },
          {
            type: CriteriaTerminalType.PATRON_GROUP,
            patronGroupId: 'patron-group-id',
          },
        ],
      },
      {
        type: 'Negation',
        criteria: {
          type: 'Condition',
          operation: 'OR',
          criteria: [
            { type: 'Age', numDays: 12 },
            {
              type: 'PatronGroup',
              patronGroupId: 'patron-group-id',
            },
          ],
        },
      },
    ],
  ])('converts group %s into %s', (input, expected) =>
    expect(criteriaToFilterDto(input)).toEqual(expected)
  );
});
