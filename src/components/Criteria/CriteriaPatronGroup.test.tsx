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
  if (endpoint.startsWith('groups')) {
    return {
      usergroups: [
        {
          id: '503a81cd-6c26-400f-b620-14c08943697c',
          group: 'faculty',
          desc: 'Faculty Member',
        },
        {
          id: '3684a786-6671-4268-8ed0-9db82ebca60b',
          group: 'staff',
          desc: 'Staff Member',
        },
        {
          id: 'ad0bc554-d5bc-463c-85d1-5562127ae91b',
          group: 'graduate',
          desc: 'Graduate Student',
        },
        {
          id: 'bdc2b6d4-5ceb-4a12-ab46-249b9a68473e',
          group: 'undergrad',
          desc: 'Undergraduate Student',
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

it('Patron group type criteria displays appropriate form', async () => {
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

  await userEvent.selectOptions(screen.getByRole('combobox'), 'Patron group');

  expect(screen.getByRole('option', { name: 'faculty' })).toBeVisible();
  expect(screen.getByRole('option', { name: 'undergrad' })).toBeVisible();

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Patron group' }),
    'staff'
  );

  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(submitter).toHaveBeenLastCalledWith({
    criteria: {
      type: 'PatronGroup',
      patronGroupId: '3684a786-6671-4268-8ed0-9db82ebca60b',
    },
  });
});
