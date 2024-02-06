import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import { QueryClient, QueryClientProvider } from 'react-query';
import withIntlConfiguration from '../test/util/withIntlConfiguration';
import TransferAccountFields from './TransferAccountFields';

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
  } else {
    fail(`Unexpected endpoint: ${endpoint}`);
  }
});

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => ({
    get: (endpoint: string) => ({
      json: () => Promise.resolve(getResponse(endpoint)),
    }),
  }),
}));

describe('Transfer account selection', () => {
  it.each([
    ['', [], ['Owner 1 account 1', 'Owner 1 account 2', 'Owner 2 account']],
    [
      'Owner 1',
      ['Owner 1 account 1', 'Owner 1 account 2'],
      ['Owner 2 account'],
    ],
    [
      'Owner 2',
      ['Owner 2 account'],
      ['Owner 1 account 1', 'Owner 1 account 2'],
    ],
  ])(
    'For owner %s, has options %s and not %s',
    async (owner, includedAccounts, excludedAccounts) => {
      render(
        withIntlConfiguration(
          <QueryClientProvider client={new QueryClient()}>
            <Form mutators={{ ...arrayMutators }} onSubmit={jest.fn()}>
              {() => <TransferAccountFields prefix="" />}
            </Form>
          </QueryClientProvider>
        )
      );

      expect(
        await screen.findByRole('option', { name: 'Owner 1' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('option', { name: 'Owner 2' })
      ).toBeInTheDocument();

      await userEvent.selectOptions(
        screen.getByRole('combobox', { name: 'Fee/fine owner' }),
        owner
      );

      includedAccounts.forEach((account) =>
        expect(
          screen.getByRole('option', { name: account })
        ).toBeInTheDocument()
      );
      excludedAccounts.forEach((account) =>
        expect(
          screen.queryByRole('option', { name: account })
        ).not.toBeInTheDocument()
      );
    }
  );
});
