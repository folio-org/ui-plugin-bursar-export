import { render, screen } from '@testing-library/react';
import { Form } from 'react-final-form';
import CriteriaCardSelect from './CriteriaCardSelect';
import React from 'react';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';

describe('Criteria card selection box', () => {
  it('root has no criteria option', () => {
    render(
      withIntlConfiguration(
        <Form onSubmit={jest.fn()}>
          {() => <CriteriaCardSelect name="test" root />}
        </Form>
      )
    );

    expect(
      screen.getByRole('option', { name: 'No criteria (always run)' })
    ).toBeInTheDocument();
  });

  it('non patron-only has item/etc options', () => {
    render(
      withIntlConfiguration(
        <Form onSubmit={jest.fn()}>
          {() => <CriteriaCardSelect name="test" />}
        </Form>
      )
    );

    expect(screen.getByRole('option', { name: 'All of:' })).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Item location' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Patron group' })
    ).toBeInTheDocument();
  });

  it('patron-only does not have item/etc options', () => {
    render(
      withIntlConfiguration(
        <Form onSubmit={jest.fn()}>
          {() => <CriteriaCardSelect name="test" patronOnly />}
        </Form>
      )
    );

    expect(screen.getByRole('option', { name: 'All of:' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Item location' })).toBeNull();
    expect(
      screen.getByRole('option', { name: 'Patron group' })
    ).toBeInTheDocument();
  });
});
