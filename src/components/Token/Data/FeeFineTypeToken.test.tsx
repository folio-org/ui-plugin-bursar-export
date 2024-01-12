import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Form } from 'react-final-form';
import { DataTokenType } from '../../../types/TokenTypes';
import DataTokenCardBody from './DataTokenCardBody';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';

describe('Fee/fine type token', () => {
  it('displays appropriate form', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form
          onSubmit={(v) => submitter(v)}
          initialValues={{ test: { type: DataTokenType.FEE_FINE_TYPE } }}
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

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type: DataTokenType.FEE_FINE_TYPE,
        feeFineAttribute: 'FEE_FINE_TYPE_NAME',
      },
    });

    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Attribute' }),
      'Type ID'
    );

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type: DataTokenType.FEE_FINE_TYPE,
        feeFineAttribute: 'FEE_FINE_TYPE_ID',
      },
    });
  });
});
