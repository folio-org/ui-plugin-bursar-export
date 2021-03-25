import React from 'react';
import { render } from '@testing-library/react';

import {
  FieldSelectFinal,
} from '@folio/stripes-acq-components';

import { useTransferAccountsQuery } from './useTransferAccountsQuery';
import { TransferAccountField } from './TransferAccountField';

jest.mock('@folio/stripes-acq-components', () => ({
  FieldSelectFinal: jest.fn(() => 'FieldSelectFinal'),
}));

jest.mock('./useTransferAccountsQuery', () => ({
  useTransferAccountsQuery: jest.fn().mockReturnValue({ transferAccounts: [] }),
}));

const renderTransferAccountField = (ownerId, onChange = jest.fn()) => render(
  <TransferAccountField ownerId={ownerId} onChange={onChange} />,
);

describe('TransferAccountField', () => {
  beforeEach(() => {
    FieldSelectFinal.mockClear();
  });

  it('should render FieldSelectFinal', () => {
    renderTransferAccountField();

    expect(FieldSelectFinal).toHaveBeenCalled();
  });

  it('should not be disabled when ownerId is passed', () => {
    renderTransferAccountField('ownerId');

    expect(FieldSelectFinal.mock.calls[0][0].disabled).toBeFalsy();
  });

  it('should be disabled when ownerId is not passed', () => {
    renderTransferAccountField();

    expect(FieldSelectFinal.mock.calls[0][0].disabled).toBeTruthy();
  });

  it('should use transfer accounts as data options', () => {
    const dataOptions = [{ label: 'Account', value: 'id' }];

    useTransferAccountsQuery.mockClear().mockReturnValue({
      transferAccounts: dataOptions.map(o => ({
        id: o.value,
        accountName: o.label,
      })),
    });

    renderTransferAccountField('ownerId');

    expect(FieldSelectFinal.mock.calls[0][0].dataOptions).toEqual(dataOptions);
  });
});
