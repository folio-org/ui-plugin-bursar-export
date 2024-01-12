import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import { DataTokenType } from '../../../types/TokenTypes';
import DataTokenCardBody from './DataTokenCardBody';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';

describe('Item info type token', () => {
  it('displays appropriate form', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={(v) => submitter(v)}
          initialValues={{ test: { type: DataTokenType.USER_DATA } }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DataTokenCardBody name="test" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Value' }),
      'Patron group ID'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Fallback value' }),
      'foo bar fallback'
    );

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type: DataTokenType.USER_DATA,
        userAttribute: 'PATRON_GROUP_ID',
        placeholder: 'foo bar fallback',
      },
    });
  });
});
