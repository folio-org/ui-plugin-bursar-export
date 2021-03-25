import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  FieldSelectFinal,
} from '@folio/stripes-acq-components';

import { useTransferAccountsQuery } from './useTransferAccountsQuery';

export const TransferAccountField = ({ ownerId }) => {
  const { formatMessage } = useIntl();
  const { transferAccounts } = useTransferAccountsQuery(ownerId);

  const dataOptions = transferAccounts.map(({ id, accountName }) => ({
    value: id,
    label: accountName,
  }));

  return (
    <FieldSelectFinal
      dataOptions={dataOptions}
      label={formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.transferAccount' })}
      name="exportTypeSpecificParameters.bursarFeeFines.transferAccountId"
      required
      disabled={!ownerId}
    />
  );
};

TransferAccountField.propTypes = {
  ownerId: PropTypes.string,
};
