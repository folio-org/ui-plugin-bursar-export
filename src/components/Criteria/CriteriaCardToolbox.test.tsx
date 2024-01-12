import { render, screen } from '@testing-library/react';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../test/util/withIntlConfiguration';
import {
  CriteriaGroupType,
  CriteriaTerminalType,
} from '../../types/CriteriaTypes';
import FormValues from '../../types/FormValues';
import CriteriaCardToolbox from './CriteriaCardToolbox';

describe('Criteria card toolbox', () => {
  it('Default outer type results in no buttons', () => {
    render(
      withIntlConfiguration(
        <Form<FormValues> mutators={{ ...arrayMutators }} onSubmit={jest.fn()}>
          {() => <CriteriaCardToolbox prefix="criteria." root alone />}
        </Form>
      )
    );

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it.each([
    CriteriaGroupType.ALL_OF,
    CriteriaGroupType.ANY_OF,
    CriteriaGroupType.NONE_OF,
  ])('Outer group type %s results in only add', (type) => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          mutators={{ ...arrayMutators }}
          onSubmit={jest.fn()}
          initialValues={{ criteria: { type } }}
        >
          {() => <CriteriaCardToolbox prefix="criteria." root alone />}
        </Form>
      )
    );

    expect(screen.queryAllByRole('button')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'plus-sign' })).toBeVisible();
  });

  it.each([
    CriteriaGroupType.ALL_OF,
    CriteriaGroupType.ANY_OF,
    CriteriaGroupType.NONE_OF,
  ])('Inner group type %s results in add and delete', (type) => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          mutators={{ ...arrayMutators }}
          onSubmit={jest.fn()}
          initialValues={{ criteria: { type } }}
        >
          {() => (
            <CriteriaCardToolbox
              prefix="criteria."
              root={false}
              alone={false}
            />
          )}
        </Form>
      )
    );

    expect(screen.queryAllByRole('button')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'plus-sign' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'trash' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'trash' })).not.toBeDisabled();
  });

  it.each([
    CriteriaGroupType.ALL_OF,
    CriteriaGroupType.ANY_OF,
    CriteriaGroupType.NONE_OF,
  ])('Inner group type alone %s results in add and disabled delete', (type) => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          mutators={{ ...arrayMutators }}
          onSubmit={jest.fn()}
          initialValues={{ criteria: { type } }}
        >
          {() => <CriteriaCardToolbox prefix="criteria." root={false} alone />}
        </Form>
      )
    );

    expect(screen.queryAllByRole('button')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'plus-sign' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'trash' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'trash' })).toBeDisabled;
  });

  it.each([CriteriaTerminalType.AGE, CriteriaTerminalType.LOCATION])(
    'Inner type alone %s has disabled delete',
    (type) => {
      render(
        withIntlConfiguration(
          <Form<FormValues>
            mutators={{ ...arrayMutators }}
            onSubmit={jest.fn()}
            initialValues={{ criteria: { type } }}
          >
            {() => (
              <CriteriaCardToolbox prefix="criteria." root={false} alone />
            )}
          </Form>
        )
      );

      expect(screen.queryAllByRole('button')).toHaveLength(1);
      expect(screen.getByRole('button', { name: 'trash' })).toBeVisible();
      expect(screen.getByRole('button', { name: 'trash' })).toBeDisabled;
    }
  );

  it.each([CriteriaTerminalType.AGE, CriteriaTerminalType.LOCATION])(
    'Inner type not alone %s has enabled delete',
    (type) => {
      render(
        withIntlConfiguration(
          <Form<FormValues>
            mutators={{ ...arrayMutators }}
            onSubmit={jest.fn()}
            initialValues={{ criteria: { type } }}
          >
            {() => (
              <CriteriaCardToolbox prefix="criteria." root={false} alone />
            )}
          </Form>
        )
      );

      expect(screen.queryAllByRole('button')).toHaveLength(1);
      expect(screen.getByRole('button', { name: 'trash' })).toBeVisible();
      expect(screen.getByRole('button', { name: 'trash' })).toHaveAttribute(
        'disabled',
        ''
      );
    }
  );
});
