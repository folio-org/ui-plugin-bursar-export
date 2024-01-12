import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import FormValues from '../../types/FormValues';
import { HeaderFooterTokenType } from '../../types/TokenTypes';
import HeaderFooterMenu from './HeaderFooterMenu';
import AggregateMenu from './AggregateMenu';
import { CriteriaAggregateType } from '../../types/CriteriaTypes';

test('Aggregate menu displays criteria on check', async () => {
  const submitter = jest.fn();

  render(
    withIntlConfiguration(
      <Form<FormValues> onSubmit={(v) => submitter(v)}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <AggregateMenu />
            <button type="submit">Submit</button>
          </form>
        )}
      </Form>
    )
  );

  // do not display criteria initially
  expect(screen.queryByRole('combobox')).toBeNull();

  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
  expect(submitter).toHaveBeenCalledWith({
    aggregate: false,
  });

  await userEvent.click(screen.getByRole('checkbox'));
  expect(await screen.findByRole('combobox')).toBeVisible();

  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
  expect(submitter).toHaveBeenCalledWith({
    aggregate: true,
    aggregateFilter: {
      type: CriteriaAggregateType.PASS,
    },
  });

  await userEvent.click(screen.getByRole('checkbox'));
  expect(screen.queryByRole('combobox')).toBeNull();

  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
  expect(submitter).toHaveBeenCalledWith({
    aggregate: false,
    aggregateFilter: {
      type: CriteriaAggregateType.PASS,
    },
  });
});
