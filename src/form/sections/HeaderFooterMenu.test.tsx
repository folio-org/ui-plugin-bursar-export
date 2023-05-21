import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import { CriteriaCardGroupType } from '../../types/CriteriaTypes';
import FormValues from '../../types/FormValues';
import CriteriaMenu from './CriteriaMenu';
import HeaderFooterMenu from './HeaderFooterMenu';
import { HeaderFooterTokenType } from '../../types/TokenTypes';

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
            <HeaderFooterMenu name="test" />
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
    test: [
      { type: HeaderFooterTokenType.NEWLINE },
      { type: HeaderFooterTokenType.NEWLINE },
      { type: HeaderFooterTokenType.NEWLINE },
    ],
  });
});
