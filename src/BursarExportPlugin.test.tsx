import { render, screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import BursarExportPlugin from './index';
import { useStripes } from '@folio/stripes/core';
import withIntlConfiguration from './test/util/withIntlConfiguration';
import useInitialValues from './hooks/useInitialValues';
import { Form, FormProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FORM_ID } from './form/ConfigurationForm';
import userEvent from '@testing-library/user-event';
import formValuesToDto from './api/dto/to/formValuesToDto';
import schedulingToDto from './api/dto/to/schedulingToDto';

jest.mock('@folio/stripes/core', () => ({
  useStripes: jest.fn(),
}));
jest.mock('./api/mutators/useManualSchedulerMutation', () => () => jest.fn());
jest.mock(
  './api/mutators/useAutomaticSchedulerMutation',
  () => () => jest.fn()
);
jest.mock('./hooks/useInitialValues', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('@folio/stripes/final-form', () => ({
  __esModule: true,
  default: () => (Component: any) => (props: FormProps) =>
    (
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

jest.mock('./api/queries/useFeeFineOwners', () => ({
  __esModule: true,
  default: () => ({ data: [feeFineOwner], isSuccess: true }),
}));

jest.mock('./api/queries/useTransferAccounts', () => ({
  __esModule: true,
  default: () => ({ data: [transferAccount], isSuccess: true }),
}));
jest.mock('./api/dto/to/formValuesToDto', () => jest.fn());
jest.mock('./api/dto/to/schedulingToDto', () => jest.fn());

describe('BursarExportPlugin', () => {
  it('renders the plugin with null initial values', () => {
    (useInitialValues as jest.Mock).mockReturnValue(null);

    render(withIntlConfiguration(<BursarExportPlugin />));

    expect(screen.getByText('Transfer configuration')).toBeVisible();
    expect(document.getElementById(FORM_ID)).toBeNull();
  });

  it('fills out the form and then saves and runs the plugin', async () => {
    (useInitialValues as jest.Mock).mockReturnValue({ aggregate: false });
    (useStripes as jest.Mock).mockReturnValue({ hasPerm: () => true });

    render(withIntlConfiguration(<BursarExportPlugin />));

    expect(screen.getByText('Transfer configuration')).toBeVisible();
    expect(document.getElementById(FORM_ID)).not.toBeNull();
    expect(screen.getByText('Account data format')).toBeVisible();
    expect(screen.getByText('Save')).toBeVisible();

    expect(screen.queryByText('Transfer to:')).not.toBeNull();

    const frequencyDropdown = document.querySelector(
      '[name = "scheduling.frequency"]'
    ) as HTMLSelectElement;
    await userEvent.selectOptions(frequencyDropdown, 'NONE');

    const ownerDropdown = document.querySelector(
      '[name = "transferInfo.else.owner"]'
    ) as HTMLSelectElement;
    await userEvent.selectOptions(ownerDropdown, 'test_owner_id');

    const accountDropdown = document.querySelector(
      '[name = "transferInfo.else.account"]'
    ) as HTMLSelectElement;
    await userEvent.selectOptions(accountDropdown, 'test_account_id');

    await userEvent.click(screen.getByText('Save'));

    expect(formValuesToDto).toHaveBeenCalled();
    expect(schedulingToDto).toHaveBeenCalled();

    await userEvent.click(screen.getByText('Run manually'));

    expect(formValuesToDto).toHaveBeenCalled();
  });
});
