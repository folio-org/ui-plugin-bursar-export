import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import FormValues from '../../types/FormValues';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import CriteriaCard from './CriteriaCard';

it('Age criteria displays appropriate form', async () => {
  const submitter = jest.fn();

  render(
    withIntlConfiguration(
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
    )
  );

  await userEvent.selectOptions(screen.getByRole('combobox'), 'Age');
  await userEvent.type(screen.getByRole('spinbutton'), '10');
  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(submitter).toHaveBeenCalledWith({
    criteria: {
      type: 'Age',
      numDays: '10',
    },
  });
});
