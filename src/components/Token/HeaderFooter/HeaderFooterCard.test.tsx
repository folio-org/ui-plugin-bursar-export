import { render, screen } from '@testing-library/react';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import HeaderFooterCard from './HeaderFooterCard';
import { HeaderFooterTokenType } from '../../../types/TokenTypes';

describe('Header/footer card', () => {
  test('has good default value', () => {
    render(
      withIntlConfiguration(
        <Form mutators={{ ...arrayMutators }} onSubmit={() => ({})}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <HeaderFooterCard
                fieldArrayName="test"
                name="test[0]"
                index={0}
                isLast
              />
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
          initialValues={{ test: [{ type: HeaderFooterTokenType.COMMA }] }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <HeaderFooterCard
                fieldArrayName="test"
                name="test[0]"
                index={0}
                isLast
              />
            </form>
          )}
        </Form>
      )
    );

    expect(screen.getByRole('combobox')).toHaveDisplayValue('Comma');
  });
});
