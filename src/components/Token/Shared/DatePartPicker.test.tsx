import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Form } from 'react-final-form';
import DatePartPicker from './DatePartPicker';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';

describe('Date part picker', () => {
  it('displays appropriate form', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form onSubmit={(v) => submitter(v)}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DatePartPicker prefix="" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    expect(screen.getByRole('combobox', { name: 'Format' })).toHaveDisplayValue(
      'Year (4-digit)'
    );
    expect(screen.getByRole('option', { name: 'Quarter' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      format: 'YEAR_LONG',
    });
  });
});
