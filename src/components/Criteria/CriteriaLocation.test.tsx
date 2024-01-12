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
  if (endpoint.startsWith('location-units/institutions')) {
    return {
      locinsts: [
        {
          id: 'institutionId',
          name: 'Test institution',
        },
      ],
    };
  } else if (endpoint.startsWith('location-units/campuses')) {
    return {
      loccamps: [
        {
          id: 'campusId1',
          name: 'Matching campus 1',
          institutionId: 'institutionId',
        },
        {
          id: 'campusId2',
          name: 'Matching campus 2',
          institutionId: 'institutionId',
        },
        {
          id: 'campusIdIrrelevant',
          name: 'Non-matching campus',
          institutionId: 'institutionIrrelevant',
        },
      ],
    };
  } else if (endpoint.startsWith('location-units/libraries')) {
    return {
      loclibs: [
        {
          id: 'libraryId',
          name: 'Matching library',
          campusId: 'campusId1',
        },
        {
          id: 'libraryIdIrrelevant',
          name: 'Non-matching library',
          campusId: 'campusIdIrrelevant',
        },
      ],
    };
  } else if (endpoint.startsWith('locations')) {
    return {
      locations: [
        {
          id: 'locationId1',
          name: 'Matching location 1',
          libraryId: 'libraryId',
        },
        {
          id: 'locationId2',
          name: 'Matching location 2',
          libraryId: 'libraryId',
        },
        {
          id: 'locationIrrelevant',
          name: 'Non-matching location',
          libraryId: 'libraryIdIrrelevant',
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

it('Location criteria displays appropriate form', async () => {
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

  function expectOptionInDocument(option: string) {
    expect(screen.getByRole('option', { name: option })).toBeVisible();
  }
  function expectOptionNotInDocument(option: string) {
    expect(screen.queryByRole('option', { name: option })).toBeNull();
  }

  await userEvent.selectOptions(screen.getByRole('combobox'), 'Item location');

  expectOptionInDocument('Test institution');
  expectOptionNotInDocument('Matching campus 1');
  expectOptionNotInDocument('Matching campus 2');
  expectOptionNotInDocument('Non-matching campus');
  expectOptionNotInDocument('Matching library');
  expectOptionNotInDocument('Non-matching library');
  expectOptionNotInDocument('Matching location 1');
  expectOptionNotInDocument('Matching location 2');
  expectOptionNotInDocument('Non-matching location');

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Institution' }),
    'Test institution'
  );

  expectOptionInDocument('Matching campus 1');
  expectOptionInDocument('Matching campus 2');
  expectOptionNotInDocument('Non-matching campus');
  expectOptionNotInDocument('Matching library');
  expectOptionNotInDocument('Non-matching library');
  expectOptionNotInDocument('Matching location 1');
  expectOptionNotInDocument('Matching location 2');
  expectOptionNotInDocument('Non-matching location');

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Campus' }),
    'Matching campus 1'
  );

  expectOptionInDocument('Matching library');
  expectOptionNotInDocument('Non-matching library');
  expectOptionNotInDocument('Matching location 1');
  expectOptionNotInDocument('Matching location 2');
  expectOptionNotInDocument('Non-matching location');

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Campus' }),
    'Matching campus 2'
  );

  expectOptionNotInDocument('Matching library');
  expectOptionNotInDocument('Non-matching library');
  expectOptionNotInDocument('Matching location 1');
  expectOptionNotInDocument('Matching location 2');
  expectOptionNotInDocument('Non-matching location');

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Campus' }),
    'Matching campus 1'
  );

  expectOptionInDocument('Matching library');
  expectOptionNotInDocument('Non-matching library');
  expectOptionNotInDocument('Matching location 1');
  expectOptionNotInDocument('Matching location 2');
  expectOptionNotInDocument('Non-matching location');

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Library' }),
    'Matching library'
  );

  expectOptionInDocument('Matching location 1');
  expectOptionInDocument('Matching location 2');
  expectOptionNotInDocument('Non-matching location');

  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Location' }),
    'Matching location 1'
  );

  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(submitter).toHaveBeenCalledWith({
    criteria: {
      type: 'Location',
      institutionId: 'institutionId',
      campusId: 'campusId1',
      libraryId: 'libraryId',
      locationId: 'locationId1',
    },
  });
});
