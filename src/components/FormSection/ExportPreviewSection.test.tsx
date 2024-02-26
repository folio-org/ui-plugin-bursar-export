import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';
import ExportPreviewSection from './ExportPreviewSection';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';

jest.mock('@ngneat/falso', () => ({
  randFloat: jest.fn(() => 12.34),
  randNumber: jest.fn(() => 2),
}));

describe('Export preview component', () => {
  it('wraps lines when selected', async () => {
    const { container } = render(
      withIntlConfiguration(
        <Form mutators={{ ...arrayMutators }} onSubmit={jest.fn()}>
          {() => <ExportPreviewSection />}
        </Form>,
      ),
    );
    // when undefined
    expect(container.querySelector('.wrap')).toBeVisible();

    await userEvent.click(screen.getByRole('checkbox', { name: 'Wrap long lines' }));
    expect(container.querySelector('.wrap')).toBeNull();

    await userEvent.click(screen.getByRole('checkbox', { name: 'Wrap long lines' }));
    expect(container.querySelector('.wrap')).toBeVisible();
  });
});
