import { render } from '@testing-library/react';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import { DataTokenType } from '../../../types/TokenTypes';
import DataTokenCardBody, { isDataBodyEmpty } from './DataTokenCardBody';

test.each([
  [undefined, true],

  [DataTokenType.NEWLINE, true],
  [DataTokenType.NEWLINE_MICROSOFT, true],
  [DataTokenType.TAB, true],
  [DataTokenType.COMMA, true],
  [DataTokenType.AGGREGATE_COUNT, true],

  [DataTokenType.ARBITRARY_TEXT, false],
  [DataTokenType.SPACE, false],
  [DataTokenType.CURRENT_DATE, false],
  [DataTokenType.ACCOUNT_AMOUNT, false],
  [DataTokenType.ACCOUNT_DATE, false],
  [DataTokenType.FEE_FINE_TYPE, false],
  [DataTokenType.ITEM_INFO, false],
  [DataTokenType.USER_DATA, false],
  [DataTokenType.CONSTANT_CONDITIONAL, false],
])('Card bodies for type %s are empty = %s', (type, expected) =>
  expect(isDataBodyEmpty(type)).toBe(expected)
);

test.each([
  undefined,
  DataTokenType.NEWLINE,
  DataTokenType.NEWLINE_MICROSOFT,
  DataTokenType.TAB,
  DataTokenType.COMMA,
  DataTokenType.AGGREGATE_COUNT,
])('Card bodies for type %s result in empty div', (type) => {
  const { container } = render(
    withIntlConfiguration(
      <Form onSubmit={() => ({})} initialValues={{ test: { type } }}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DataTokenCardBody name="test" />
          </form>
        )}
      </Form>
    )
  );

  expect(container.textContent).toBe('');
});
