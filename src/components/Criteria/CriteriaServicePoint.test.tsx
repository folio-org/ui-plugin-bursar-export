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
  if (endpoint.startsWith('service-points')) {
    return {
      servicepoints: [
        {
          id: '3a40852d-49fd-4df2-a1f9-6e2641a6e91f',
          name: 'Circ Desk 1',
        },
        {
          id: 'c4c90014-c8c9-4ade-8f24-b5e313319f4b',
          name: 'Circ Desk 2',
        },
        {
          id: '7c5abc9f-f3d7-4856-b8d7-6712462ca007',
          name: 'Online',
        },
      ],
      totalRecords: 4,
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

it('Service point type criteria displays appropriate form', async () => {
  const submitter = jest.fn();

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
    'Item service point'
  );

  expect(screen.getByRole('option', { name: 'Circ Desk 1' })).toBeVisible();
  expect(screen.getByRole('option', { name: 'Online' })).toBeVisible();

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Service point' }),
    'Circ Desk 1'
  );

  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(submitter).toHaveBeenLastCalledWith({
    criteria: {
      type: 'ServicePoint',
      servicePointId: '3a40852d-49fd-4df2-a1f9-6e2641a6e91f',
    },
  });
});
