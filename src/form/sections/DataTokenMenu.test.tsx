import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import FormValues from '../../types/FormValues';
import DataTokenMenu from './DataTokenMenu';
import { DataTokenType } from '../../types/TokenTypes';

test('Add button works as expected', async () => {
  const submitter = jest.fn();

  render(
    withIntlConfiguration(
      <Form<FormValues>
        mutators={{ ...arrayMutators }}
        onSubmit={(v) => submitter(v)}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DataTokenMenu />
            <button type="submit">Submit</button>
          </form>
        )}
      </Form>
    )
  );

  await userEvent.click(screen.getByRole('button', { name: 'Add' }));
  await userEvent.click(screen.getByRole('button', { name: 'Add' }));
  await userEvent.click(screen.getByRole('button', { name: 'Add' }));

  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(submitter).toHaveBeenCalledWith({
    data: [
      { type: DataTokenType.NEWLINE },
      { type: DataTokenType.NEWLINE },
      { type: DataTokenType.NEWLINE },
    ],
  });
});

test('Add button in aggregate mode works as expected', async () => {
  const submitter = jest.fn();

  render(
    withIntlConfiguration(
      <Form<FormValues>
        mutators={{ ...arrayMutators }}
        onSubmit={(v) => submitter(v)}
        initialValues={{ aggregate: true }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DataTokenMenu />
            <button type="submit">Submit</button>
          </form>
        )}
      </Form>
    )
  );

  await userEvent.click(screen.getByRole('button', { name: 'Add' }));
  await userEvent.click(screen.getByRole('button', { name: 'Add' }));
  await userEvent.click(screen.getByRole('button', { name: 'Add' }));

  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(submitter).toHaveBeenCalledWith({
    aggregate: true,
    dataAggregate: [
      { type: DataTokenType.NEWLINE },
      { type: DataTokenType.NEWLINE },
      { type: DataTokenType.NEWLINE },
    ],
  });
});
