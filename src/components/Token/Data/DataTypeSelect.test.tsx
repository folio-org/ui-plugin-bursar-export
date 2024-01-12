import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import { DataTokenType } from '../../../types/TokenTypes';
import DataTypeSelect from './DataTypeSelect';

describe('Data token type selection', () => {
  it('has correct default', async () => {
    const submitter = jest.fn();

    render(
      withIntlConfiguration(
        <Form onSubmit={(v) => submitter(v)}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DataTypeSelect name="test" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    expect(screen.getByRole('combobox')).toHaveDisplayValue('Newline (LF)');

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(submitter).toHaveBeenLastCalledWith({
      test: DataTokenType.NEWLINE,
    });
  });

  it('respects initial values', () => {
    render(
      withIntlConfiguration(
        <Form
          onSubmit={() => ({})}
          initialValues={{
            test: DataTokenType.FEE_FINE_TYPE,
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DataTypeSelect name="test" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    expect(screen.getByRole('combobox')).toHaveDisplayValue('Fee/fine type');
  });

  it.each([
    ['Newline (LF)', undefined],
    ['Newline (LF)', false],
    ['Newline (LF)', true],

    ['Item info', undefined],
    ['Item info', false],

    ['Total amount', true],
    ['Number of accounts', true],
  ])('has %s when aggregate=%s', (optionName, aggregate) => {
    render(
      withIntlConfiguration(
        <Form onSubmit={() => ({})} initialValues={{ aggregate }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DataTypeSelect name="test" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    expect(
      screen.getByRole('option', { name: optionName })
    ).toBeInTheDocument();
  });

  it.each([
    ['Item info', true],

    ['Total amount', undefined],
    ['Total amount', false],
    ['Number of accounts', undefined],
    ['Number of accounts', false],
  ])('does not have %s when aggregate=%s', (optionName, aggregate) => {
    render(
      withIntlConfiguration(
        <Form onSubmit={() => ({})} initialValues={{ aggregate }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DataTypeSelect name="test" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Form>
      )
    );

    expect(screen.queryByRole('option', { name: optionName })).toBeNull();
  });
});
