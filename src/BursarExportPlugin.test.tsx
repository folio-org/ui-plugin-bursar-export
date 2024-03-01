import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';
import { useStripes } from '@folio/stripes/core';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form, FormProps } from 'react-final-form';
import withIntlConfiguration from '../test/util/withIntlConfiguration';
import { formValuesToDto, schedulingToDto } from './api/dto/to';
import { FORM_ID } from './constants';
import useInitialValues from './hooks/useInitialValues';
import BursarExportPlugin from './index';

jest.mock('./api/dto/to', () => ({ formValuesToDto: jest.fn(), schedulingToDto: jest.fn() }));

jest.mock('./api/mutators', () => ({
  useManualSchedulerMutation: () => jest.fn(),
  useAutomaticSchedulerMutation: () => jest.fn(),
}));
jest.mock('./hooks/useInitialValues', () => jest.fn());
jest.mock('@folio/stripes/final-form', () => ({
  __esModule: true,
  default: () => (Component: any) => (props: FormProps) => (
    <Form mutators={{ ...arrayMutators }} {...props}>
      {(formProps) => <Component {...formProps} {...props} />}
    </Form>
  ),
}));

const feeFineOwner = {
  owner: 'Test owner',
  id: 'test_owner_id',
};
const transferAccount = {
  accountName: 'Test account',
  ownerId: 'test_owner_id',
  id: 'test_account_id',
  desc: 'Test description',
};

jest.mock('./api/queries', () => ({
  useFeeFineOwners: () => ({ data: [feeFineOwner], isSuccess: true }),
  useTransferAccounts: () => ({ data: [transferAccount], isSuccess: true }),
}));

describe('BursarExportPlugin', () => {
  it('renders the plugin with null initial values', () => {
    (useInitialValues as jest.Mock).mockReturnValue(null);

    render(withIntlConfiguration(<BursarExportPlugin />));

    expect(screen.getByText('Transfer configuration')).toBeVisible();
    expect(screen.queryByTestId(FORM_ID)).toBeNull();
  });

  it('fills out the form and then saves and runs the plugin', async () => {
    (useInitialValues as jest.Mock).mockReturnValue({ aggregate: false });
    (useStripes as jest.Mock).mockReturnValue({ hasPerm: () => true });

    render(withIntlConfiguration(<BursarExportPlugin />));

    expect(screen.getByText('Transfer configuration')).toBeVisible();
    expect(screen.queryByTestId(FORM_ID)).toBeVisible();
    expect(screen.getByText('Account data format')).toBeVisible();
    expect(screen.getByText('Save')).toBeVisible();

    expect(screen.queryByText('Transfer to:')).not.toBeNull();

    const frequencyDropdown = screen.getByRole('combobox', {
      name: 'Frequency',
    }) as HTMLSelectElement;
    await userEvent.selectOptions(frequencyDropdown, 'NONE');

    const ownerDropdown = screen.getByRole('combobox', {
      name: 'Fee/fine owner',
    }) as HTMLSelectElement;
    await userEvent.selectOptions(ownerDropdown, 'test_owner_id');

    const accountDropdown = screen.getByRole('combobox', {
      name: 'Transfer account',
    }) as HTMLSelectElement;
    await userEvent.selectOptions(accountDropdown, 'test_account_id');

    await userEvent.click(screen.getByText('Save'));

    expect(formValuesToDto).toHaveBeenCalled();
    expect(schedulingToDto).toHaveBeenCalled();

    await userEvent.click(screen.getByText('Run manually'));

    expect(formValuesToDto).toHaveBeenCalled();
  });
});
