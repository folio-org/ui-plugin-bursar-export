import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import { FormValues } from '../../types';
import CriteriaCard from './CriteriaCard';

it('Criteria card with "no criteria" should be empty', async () => {
  const { container } = render(
    withIntlConfiguration(
      <Form<FormValues> mutators={{ ...arrayMutators }} onSubmit={jest.fn()}>
        {() => <CriteriaCard name="criteria" root alone />}
      </Form>,
    ),
  );

  await userEvent.selectOptions(screen.getByRole('combobox'), 'All of:');
  await userEvent.selectOptions(screen.getByRole('combobox'), 'No criteria (always run)');

  expect(container.querySelector('[data-test-card-body]')).toHaveTextContent('');
  expect(container.querySelector('[data-test-card-body]')).toHaveClass('emptyBody');
});
