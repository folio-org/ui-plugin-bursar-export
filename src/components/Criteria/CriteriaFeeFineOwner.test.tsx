import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import FormValues from '../../types/FormValues';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import CriteriaCard from './CriteriaCard';
import { QueryClient, QueryClientProvider } from 'react-query';

const getResponse = jest.fn((endpoint: string) => {
  if (endpoint.startsWith('owners')) {
    return {
      owners: [
        {
          id: '9cb8f9fd-4386-45d0-bb6e-aa8b33e577b0',
          owner: 'Owner 1',
        },
        {
          id: '3da4b49d-ee7a-41fc-bf53-10f626180f7f',
          owner: 'Owner 2',
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

describe('Fee/fine owner criteria displays appropriate form', () => {
  const submitter = jest.fn();

  beforeEach(async () => {
    render(
      withIntlConfiguration(
        <QueryClientProvider client={new QueryClient()}>
          <Form<FormValues>
            mutators={{ ...arrayMutators }}
            onSubmit={(v) => submitter(v)}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <CriteriaCard name="criteria" root alone />
                <button type="submit">Submit</button>
              </form>
            )}
          </Form>
        </QueryClientProvider>
      )
    );

    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      'Fee/fine owner'
    );
  });

  it('Selecting an owner works as expected', async () => {
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Fee/fine owner' }),
      'Owner 1'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      criteria: {
        type: 'FeeFineOwner',
        feeFineOwnerId: '9cb8f9fd-4386-45d0-bb6e-aa8b33e577b0',
      },
    });
  });
});
