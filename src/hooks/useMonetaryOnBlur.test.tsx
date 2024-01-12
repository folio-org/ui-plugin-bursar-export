import { TextField } from '@folio/stripes/components';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Field, Form } from 'react-final-form';
import withIntlConfiguration from '../test/util/withIntlConfiguration';
import FormValues from '../types/FormValues';
import useMonetaryOnBlur from './useMonetaryOnBlur';

const submitter = jest.fn((_) => ({}));

function TestComponent() {
  return (
    <Form<FormValues> onSubmit={(v) => submitter(v)}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="test">
            {(fieldProps) => (
              <TextField<number>
                {...fieldProps}
                fullWidth
                marginBottom0
                required
                label="Test"
                type="number"
                min={0}
                step={0.01}
                onBlur={useMonetaryOnBlur('test')}
              />
            )}
          </Field>
          <button type="submit">Submit</button>
        </form>
      )}
    </Form>
  );
}

it('Monetary onBlur works as expected on a field with nothing typed', async () => {
  render(withIntlConfiguration(<TestComponent />));

  await userEvent.click(screen.getByRole('spinbutton'));
  await userEvent.tab();
  screen.getByRole('spinbutton').blur();
  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
  waitFor (() => expect(submitter).toHaveBeenCalledWith({
    test: '0.00',
  }));
});

it.each([
  [' ', '0.00'],
  ['0', '0.00'],
  ['12', '12.00'],
  ['12.00', '12.00'],
  ['12.3', '12.30'],
  ['12.30', '12.30'],
  ['12.34', '12.34'],
  ['12.346', '12.35'],
])(
  'Monetary onBlur works as expected on a field with $%s',
  async (input, expected) => {
    render(withIntlConfiguration(<TestComponent />));

    await userEvent.type(screen.getByRole('spinbutton'), input);
    screen.getByRole('spinbutton').blur();
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    waitFor(() => {
      expect(screen.getByRole('spinbutton')).toHaveValue(parseFloat(expected));
      expect(submitter).toHaveBeenCalledWith({
        test: expected,
      });
    });
  }
);
