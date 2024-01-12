import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import { HeaderFooterTokenType } from '../../../types/TokenTypes';
import HeaderFooterTypeSelect from './HeaderFooterTypeSelect';

describe('Header/footer type selection', () => {
  it('has correct default', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form onSubmit={(v) => submitter(v)}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <HeaderFooterTypeSelect name="test" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    expect(screen.getByRole('combobox')).toHaveDisplayValue('Newline (LF)');

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(submitter).toHaveBeenLastCalledWith({
      test: HeaderFooterTokenType.NEWLINE,
    });
  });

  it('respects initial values', () => {
    render(
      withIntlConfiguration(
        <Form
          onSubmit={() => ({})}
          initialValues={{
            test: HeaderFooterTokenType.ARBITRARY_TEXT,
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <HeaderFooterTypeSelect name="test" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    expect(screen.getByRole('combobox')).toHaveDisplayValue('Text');
  });
});
