import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import {
  DataTokenType,
  HeaderFooterTokenType,
} from '../../../types/TokenTypes';
import DataTokenCardBody from '../Data/DataTokenCardBody';
import HeaderFooterCardBody from '../HeaderFooter/HeaderFooterCardBody';

describe('Aggregate total token', () => {
  it.each([
    [HeaderFooterTokenType.AGGREGATE_TOTAL, HeaderFooterCardBody],
    [DataTokenType.ACCOUNT_AMOUNT, DataTokenCardBody],
    [DataTokenType.AGGREGATE_TOTAL, DataTokenCardBody],
  ])('displays appropriate form', async (type, Component) => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form
          onSubmit={(v) => submitter(v)}
          initialValues={{
            test: { type },
          }}
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

    expect(screen.getByRole('checkbox')).toBeVisible();

    // check default
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type,
        decimal: true,
      },
    });

    await userEvent.click(screen.getByRole('checkbox'));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type,
        decimal: false,
      },
    });

    await userEvent.click(screen.getByRole('checkbox'));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitter).toHaveBeenLastCalledWith({
      test: {
        type,
        decimal: true,
      },
    });
  });
});
