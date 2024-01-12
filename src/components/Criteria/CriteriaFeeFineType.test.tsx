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
  } else if (endpoint.startsWith('feefines')) {
    return {
      feefines: [
        {
          id: '9523cb96-e752-40c2-89da-60f3961a488d',
          feeFineType: 'Overdue fine',
          automatic: true,
        },
        {
          id: 'cf238f9f-7018-47b7-b815-bb2db798e19f',
          feeFineType: 'Lost item fee',
          automatic: true,
        },
        {
          id: '49223209-4d06-4bb5-8b7e-d0b7e5b8fb10',
          ownerId: '9cb8f9fd-4386-45d0-bb6e-aa8b33e577b0',
          feeFineType: 'Type 1',
          automatic: false,
        },
        {
          id: '5fc86d9c-b26d-5ac4-87d9-289171846190',
          ownerId: '9cb8f9fd-4386-45d0-bb6e-aa8b33e577b0',
          feeFineType: 'Type 2',
          automatic: false,
        },
        {
          id: '9cfceb6d-e061-5512-ba43-22c349b8c728',
          ownerId: '3da4b49d-ee7a-41fc-bf53-10f626180f7f',
          feeFineType: 'Type 3',
          automatic: false,
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

describe('Fee/fine type criteria displays appropriate form', () => {
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
      'Fee/fine type'
    );
  });

  it('Automatic works as expected', async () => {
    // check default fill in
    expect(
      screen.getByRole('combobox', { name: 'Fee/fine owner' })
    ).toHaveDisplayValue('Automatic');

    expect(screen.getByRole('option', { name: 'Overdue fine' })).toBeVisible();
    expect(screen.getByRole('option', { name: 'Lost item fee' })).toBeVisible();
    expect(screen.queryByRole('option', { name: 'Type 1' })).toBeNull();
    expect(screen.queryByRole('option', { name: 'Type 2' })).toBeNull();
    expect(screen.queryByRole('option', { name: 'Type 3' })).toBeNull();

    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Fee/fine type' }),
      'Lost item fee'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      criteria: {
        type: 'FeeType',
        feeFineOwnerId: 'automatic',
        feeFineTypeId: 'cf238f9f-7018-47b7-b815-bb2db798e19f',
      },
    });
  });

  it('Selecting an owner works as expected', async () => {
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Fee/fine owner' }),
      'Owner 1'
    );

    expect(screen.getByRole('option', { name: 'Type 1' })).toBeVisible();
    expect(screen.getByRole('option', { name: 'Type 2' })).toBeVisible();
    expect(screen.queryByRole('option', { name: 'Type 3' })).toBeNull();
    expect(screen.queryByRole('option', { name: 'Overdue fine' })).toBeNull();

    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Fee/fine type' }),
      'Type 2'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      criteria: {
        type: 'FeeType',
        feeFineOwnerId: '9cb8f9fd-4386-45d0-bb6e-aa8b33e577b0',
        feeFineTypeId: '5fc86d9c-b26d-5ac4-87d9-289171846190',
      },
    });
  });
});
