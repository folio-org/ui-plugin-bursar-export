import { ComparisonOperator, CriteriaTerminalType } from '../../../types/CriteriaTypes';
import FormValues from '../../../types/FormValues';
import { TransferAccountDTO } from '../../queries/useTransferAccounts';
import { BursarExportTransferCriteria } from '../types';
import dtoToTransfer from './dtoToTransfer';

test.each<
  [
    BursarExportTransferCriteria,
    TransferAccountDTO[],
    FormValues['transferInfo']
  ]
>([
  [
    { else: { account: 'account' } },
    [],
    {
      conditions: [],
      else: {
        account: 'account',
      },
    },
  ],
  [
    { else: { account: 'account' } },
    [{ id: 'account', ownerId: 'owner' } as TransferAccountDTO],
    {
      conditions: [],
      else: {
        account: 'account',
        owner: 'owner',
      },
    },
  ],
  [
    {
      conditions: [
        { condition: { type: 'Age', condition: 'GREATER_THAN', numDays: 3 }, account: 'account1' },
      ],
      else: { account: 'account2' },
    },
    [
      { id: 'account1', ownerId: 'owner1' },
      { id: 'account2', ownerId: 'owner2' },
    ] as TransferAccountDTO[],
    {
      conditions: [
        {
          condition: {
            type: CriteriaTerminalType.AGE,
            operator: ComparisonOperator.GREATER_THAN,
            numDays: '3'
          },
          account: 'account1',
          owner: 'owner1',
        },
      ],
      else: {
        account: 'account2',
        owner: 'owner2',
      },
    },
  ],
])(
  'Converts transfer DTO %s with known accounts %s to %s',
  (input, transferAccounts, expected) =>
    expect(dtoToTransfer(input, [], [], transferAccounts)).toEqual(expected)
);
