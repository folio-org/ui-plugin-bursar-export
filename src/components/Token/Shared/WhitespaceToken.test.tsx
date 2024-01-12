import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import {
  DataTokenType,
  HeaderFooterTokenType,
} from '../../../types/TokenTypes';
import DataTokenCardBody from '../Data/DataTokenCardBody';
import HeaderFooterCardBody from '../HeaderFooter/HeaderFooterCardBody';

describe('Whitespace token', () => {
  it.each([
    [HeaderFooterTokenType.SPACE, HeaderFooterCardBody],
    [DataTokenType.SPACE, DataTokenCardBody],
  ])('displays appropriate form', async (type, Component) => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={(v) => submitter(v)}
          initialValues={{ test: { type } }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Component name="test" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    expect(screen.getByRole('spinbutton')).toBeVisible();

    await userEvent.type(screen.getByRole('spinbutton'), '8');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type: HeaderFooterTokenType.SPACE,
        repeat: '8',
      },
    });
  });
});
