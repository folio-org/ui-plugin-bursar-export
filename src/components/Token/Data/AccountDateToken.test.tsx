import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import { DataTokenType } from '../../../types/TokenTypes';
import DataTokenCardBody from './DataTokenCardBody';

describe('Account date token', () => {
  it('displays appropriate form', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form
          onSubmit={(v) => submitter(v)}
          initialValues={{ test: { type: DataTokenType.ACCOUNT_DATE } }}
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
      screen.getByRole('combobox', { name: 'Format' }),
      'Quarter'
    );
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Timezone' }),
      'UTC'
    );
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Date' }),
      'Last updated date'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Fallback value' }),
      'placeholder'
    );

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type: DataTokenType.ACCOUNT_DATE,
        dateProperty: 'UPDATED',
        format: 'QUARTER',
        timezone: 'UTC',
        placeholder: 'placeholder',
      },
    });
  });
});
