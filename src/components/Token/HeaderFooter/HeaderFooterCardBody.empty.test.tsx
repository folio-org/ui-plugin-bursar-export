import { render } from '@testing-library/react';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import { HeaderFooterTokenType } from '../../../types/TokenTypes';
import HeaderFooterCardBody, {
  isHeaderFooterBodyEmpty,
} from './HeaderFooterCardBody';

test.each([
  [undefined, true],

  [HeaderFooterTokenType.NEWLINE, true],
  [HeaderFooterTokenType.NEWLINE_MICROSOFT, true],
  [HeaderFooterTokenType.TAB, true],
  [HeaderFooterTokenType.COMMA, true],
  [HeaderFooterTokenType.AGGREGATE_COUNT, true],

  [HeaderFooterTokenType.ARBITRARY_TEXT, false],
  [HeaderFooterTokenType.SPACE, false],
  [HeaderFooterTokenType.CURRENT_DATE, false],
  [HeaderFooterTokenType.AGGREGATE_TOTAL, false],
])('Card bodies for type %s are empty = %s', (type, expected) =>
  expect(isHeaderFooterBodyEmpty(type)).toBe(expected)
);

test.each([
  undefined,
  HeaderFooterTokenType.NEWLINE,
  HeaderFooterTokenType.NEWLINE_MICROSOFT,
  HeaderFooterTokenType.TAB,
  HeaderFooterTokenType.COMMA,
  HeaderFooterTokenType.AGGREGATE_COUNT,
])('Card bodies for type %s result in empty div', (type) => {
  const { container } = render(
    withIntlConfiguration(
      <Form onSubmit={() => ({})} initialValues={{ test: { type } }}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <HeaderFooterCardBody name="test" />
          </form>
        )}
      </Form>
    )
  );

  expect(container.textContent).toBe('');
});
