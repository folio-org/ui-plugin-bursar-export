import { render } from '@testing-library/react';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import CriteriaCard from './CriteriaCard';

it('Criteria card with unknown type should display loading', () => {
  const { container } = render(
    withIntlConfiguration(
      <Form
        mutators={{ ...arrayMutators }}
        onSubmit={jest.fn()}
        initialValues={{ criteria: { type: 'foobar' } }}
      >
        {() => <CriteriaCard name="criteria" root alone />}
      </Form>
    )
  );

  expect(
    container.querySelector('[data-test-card-body] .spinner')
  ).toBeVisible();
});
