import { CriteriaTerminalType } from '../../../types/CriteriaTypes';
import FormValues from '../../../types/FormValues';
import { BursarExportTransferCriteria } from '../types';
import transferToDto from './transferToDto';

describe('Transfer info conversion', () => {
  test.each<[FormValues['transferInfo'], BursarExportTransferCriteria]>([
    [undefined, { conditions: [], else: { account: '' } }],
    [{}, { conditions: [], else: { account: '' } }],
    [{ else: {} }, { conditions: [], else: { account: '' } }],
    [{ conditions: [] }, { conditions: [], else: { account: '' } }],
    [
      { conditions: [], else: { account: 'else-value' } },
      { conditions: [], else: { account: 'else-value' } },
    ],
    [
      {
        conditions: [
          {
            condition: {
              type: CriteriaTerminalType.PATRON_GROUP,
              patronGroupId: 'patronGroup',
            },
          },
        ],
        else: { account: 'else' },
      },
      {
        conditions: [
          {
            condition: { type: 'PatronGroup', patronGroupId: 'patronGroup' },
            account: '',
          },
        ],
        else: { account: 'else' },
      },
    ],
    [
      {
        conditions: [
          {
            condition: {
              type: CriteriaTerminalType.SERVICE_POINT,
              servicePointId: 'spId',
            },
            account: 'if-acct',
          },
        ],
        else: { account: 'else-sp' },
      },
      {
        conditions: [
          {
            condition: { type: 'ServicePoint', servicePointId: 'spId' },
            account: 'if-acct',
          },
        ],
        else: { account: 'else-sp' },
      },
    ],
  ])('Converts %s into %s', (token, expected) =>
    expect(transferToDto(token)).toEqual(expected)
  );
});
