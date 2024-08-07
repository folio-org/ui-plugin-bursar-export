import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import React from 'react';
import { Form } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import { FormValues, SchedulingFrequency } from '../../types';
import SchedulingSection from './SchedulingSection';

describe('Scheduling section', () => {
  it('Manual (never) option does not show extra fields', () => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          onSubmit={jest.fn()}
          initialValues={{
            scheduling: { frequency: SchedulingFrequency.Manual },
          }}
        >
          {() => <SchedulingSection />}
        </Form>,
      ),
    );

    // no interval, weekdays, or time
    expect(screen.queryAllByRole('textbox')).toHaveLength(0);
  });

  it('Hours option shows interval option only', () => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          onSubmit={jest.fn()}
          initialValues={{
            scheduling: { frequency: SchedulingFrequency.Hours },
          }}
        >
          {() => <SchedulingSection />}
        </Form>,
      ),
    );

    expect(screen.queryAllByRole('textbox')).toHaveLength(1);
    expect(screen.getByRole('textbox', { name: 'Hours between runs' })).toBeVisible();
  });

  it('Days option shows interval and start time options only', () => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          onSubmit={jest.fn()}
          initialValues={{
            scheduling: { frequency: SchedulingFrequency.Days },
          }}
        >
          {() => <SchedulingSection />}
        </Form>,
      ),
    );

    expect(screen.queryAllByRole('textbox')).toHaveLength(2);
    expect(screen.getByRole('textbox', { name: 'Days between runs' })).toBeVisible();
    expect(
      screen.getByRole('textbox', {
        name: (name: string) => name.startsWith('Start time'),
      }),
    ).toBeVisible();
  });

  it('Weeks option shows all options', () => {
    render(
      withIntlConfiguration(
        <Form<FormValues>
          onSubmit={jest.fn()}
          initialValues={{
            scheduling: { frequency: SchedulingFrequency.Weeks },
          }}
        >
          {() => <SchedulingSection />}
        </Form>,
      ),
    );

    expect(screen.queryAllByRole('textbox')).toHaveLength(2);
    expect(screen.getByRole('textbox', { name: 'Weeks between runs' })).toBeVisible();
    expect(
      screen.getByRole('textbox', {
        name: (name: string) => name.startsWith('Start time'),
      }),
    ).toBeVisible();
    expect(screen.getByRole('combobox', { name: 'Run on weekdays' })).toBeVisible();
  });
});
