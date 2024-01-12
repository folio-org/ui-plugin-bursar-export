import { render, screen } from '@testing-library/react';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import { DataTokenType } from '../../../types/TokenTypes';
import DataTokenCard from './DataTokenCard';

describe('Data token card', () => {
  test('has good default value', () => {
    render(
      withIntlConfiguration(
        <Form mutators={{ ...arrayMutators }} onSubmit={() => ({})}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DataTokenCard name="test[0]" index={0} isLast />
            </form>
          )}
        </Form>
      )
    );

    expect(screen.getByRole('combobox')).toHaveDisplayValue('Newline (LF)');
  });

  it('respects initial value', () => {
    render(
      withIntlConfiguration(
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={() => ({})}
          initialValues={{ data: [{ type: DataTokenType.COMMA }] }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DataTokenCard name="data[0]" index={0} isLast />
            </form>
          )}
        </Form>
      )
    );

    expect(screen.getByRole('combobox')).toHaveDisplayValue('Comma');
  });
});
