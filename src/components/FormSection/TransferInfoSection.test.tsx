import { act, render, screen, waitFor } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import { QueryClient, QueryClientProvider } from 'react-query';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import { ComparisonOperator, CriteriaTerminalType } from '../../types';
import TransferInfoSection from './TransferInfoSection';

const getResponse = jest.fn((endpoint: string) => {
  if (endpoint.startsWith('owners')) {
    return {
      owners: [
        {
          id: 'owner1id',
          owner: 'Owner 1',
        },
        {
          id: 'owner2id',
          owner: 'Owner 2',
        },
      ],
    };
  } else if (endpoint.startsWith('transfers')) {
    return {
      transfers: [
        {
          id: 'owner1account1id',
          accountName: 'Owner 1 account 1',
          ownerId: 'owner1id',
        },
        {
          id: 'owner1account2id',
          accountName: 'Owner 1 account 2',
          ownerId: 'owner1id',
        },
        {
          id: 'owner2accountId',
          accountName: 'Owner 2 account',
          ownerId: 'owner2id',
        },
      ],
    };
  } else if (endpoint.startsWith('groups')) {
    return {
      usergroups: [
        { id: '1', group: 'staff' },
        { id: '2', group: 'undergraduate' },
      ],
    };
  } else {
    fail(`Unexpected endpoint: ${endpoint}`);
    return {};
  }
});

jest.mock('@folio/stripes/core', () => ({
  useOkapiKy: () => ({
    get: (endpoint: string) => ({
      json: () => Promise.resolve(getResponse(endpoint)),
    }),
  }),
}));

describe('Transfer criteria section', () => {
  it('Displays labels appropriately depending on number of conditions', async () => {
    render(
      withIntlConfiguration(
        <QueryClientProvider client={new QueryClient()}>
          <Form mutators={{ ...arrayMutators }} onSubmit={jest.fn()}>
            {() => <TransferInfoSection />}
          </Form>
        </QueryClientProvider>,
      ),
    );

    expect(screen.getByText('Transfer to:')).toBeVisible();
    expect(screen.queryByText('Otherwise:')).toBeNull();
    expect(screen.queryByText(/Conditions will be evaluated in order/)).toBeNull();

    await act(() => userEvent.click(screen.getByRole('button', { name: 'Add condition' })));
    await waitFor(() => {
      expect(screen.queryByText('Transfer to:')).toBeNull();
      expect(screen.getByText('Otherwise:')).toBeVisible();
      screen.debug();
      expect(screen.queryByText(/Conditions will be evaluated in order/)).toBeVisible();
    });

    await act(() => userEvent.click(screen.getAllByRole('button', { name: 'trash' })[0]));

    expect(screen.getByText('Transfer to:')).toBeVisible();
    expect(screen.queryByText('Otherwise:')).toBeNull();
    expect(screen.queryByText(/Conditions will be evaluated in order/)).toBeNull();
  });

  describe('buttons work as expected', () => {
    const submitter = jest.fn();

    beforeEach(() => {
      render(
        withIntlConfiguration(
          <QueryClientProvider client={new QueryClient()}>
            <Form
              mutators={{ ...arrayMutators }}
              onSubmit={(v) => submitter(v)}
              initialValues={{
                transferInfo: {
                  conditions: [
                    {
                      condition: {
                        type: CriteriaTerminalType.AGE,
                        operator: ComparisonOperator.GREATER_THAN,
                        numDays: '10',
                      },
                      owner: 'owner1id',
                      account: 'owner1account1id',
                    },
                    {
                      condition: {
                        type: CriteriaTerminalType.AMOUNT,
                        operator: ComparisonOperator.GREATER_THAN,
                        amountCurrency: '20',
                      },
                      owner: 'owner1id',
                      account: 'owner1account2id',
                    },
                  ],
                  else: {
                    owner: 'owner2id',
                    account: 'owner2accountId',
                  },
                },
              }}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TransferInfoSection />
                  <button type="submit">Submit</button>
                </form>
              )}
            </Form>
          </QueryClientProvider>,
        ),
      );
    });

    it('add works as expected', async () => {
      await act(() => userEvent.click(screen.getByRole('button', { name: 'Add condition' })));
      await act(async () => {
        await userEvent.selectOptions(
          screen.getAllByRole('combobox', { name: 'Criteria' })[2],
          'Patron group',
        );
        await userEvent.selectOptions(
          screen.getByRole('combobox', { name: 'Patron group' }),
          'staff',
        );
        await userEvent.selectOptions(
          screen.getAllByRole('combobox', { name: 'Fee/fine owner' })[2],
          'Owner 2',
        );
        await userEvent.selectOptions(
          screen.getAllByRole('combobox', { name: 'Transfer account' })[2],
          'Owner 2 account',
        );
      });
      await act(() => userEvent.click(screen.getByRole('button', { name: 'Submit' })));

      expect(submitter).toHaveBeenLastCalledWith({
        transferInfo: {
          conditions: [
            {
              condition: {
                type: CriteriaTerminalType.AGE,
                operator: ComparisonOperator.GREATER_THAN,
                numDays: '10',
              },
              owner: 'owner1id',
              account: 'owner1account1id',
            },
            {
              condition: {
                type: CriteriaTerminalType.AMOUNT,
                operator: ComparisonOperator.GREATER_THAN,
                amountCurrency: '20',
              },
              owner: 'owner1id',
              account: 'owner1account2id',
            },
            {
              condition: {
                type: CriteriaTerminalType.PATRON_GROUP,
                patronGroupId: '1',
              },
              owner: 'owner2id',
              account: 'owner2accountId',
            },
          ],
          else: {
            owner: 'owner2id',
            account: 'owner2accountId',
          },
        },
      });
    });
  });
});
