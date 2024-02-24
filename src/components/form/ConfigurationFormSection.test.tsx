import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form, FormProps } from 'react-final-form';
import withIntlConfiguration from '../../../test/util/withIntlConfiguration';
import ConfigurationFormSection from './ConfigurationFormSection';

jest.mock('@folio/stripes/final-form', () => ({
  __esModule: true,
  default: () => (Component: any) => (props: FormProps) => (
    <Form mutators={{ ...arrayMutators }} {...props}>
      {(formProps) => <Component {...formProps} {...props} />}
    </Form>
  ),
}));

jest.mock('../../api/queries/useFeeFineOwners', () => ({
  __esModule: true,
  default: () => ({ data: [], isSuccess: true }),
}));

jest.mock('../../api/queries/useTransferAccounts', () => ({
  __esModule: true,
  default: () => ({ data: [], isSuccess: true }),
}));

describe('Configuration form section', () => {
  it('renders the configuration form', () => {
    render(
      withIntlConfiguration(
        <ConfigurationFormSection formApiRef={{ current: null }} initialValues={{ aggregate: false }} onSubmit={jest.fn()} />,
      ),
    );

    expect(screen.getByText('Account data format')).toBeVisible();
  });

  it('renders the configuration form with aggregate initial true', () => {
    render(
      withIntlConfiguration(
        <ConfigurationFormSection formApiRef={{ current: null }} initialValues={{ aggregate: true }} onSubmit={jest.fn()} />,
      ),
    );

    expect(screen.getByText('Patron data format')).toBeVisible();
  });
});
