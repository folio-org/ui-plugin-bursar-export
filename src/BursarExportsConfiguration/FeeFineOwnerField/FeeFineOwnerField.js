import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  FieldSelectFinal,
} from '@folio/stripes-acq-components';

import { useFeeFineOwnersQuery } from './useFeeFineOwnersQuery';

export const FeeFineOwnerField = ({ onChange }) => {
  const { formatMessage } = useIntl();
  const { owners } = useFeeFineOwnersQuery();

  const dataOptions = owners.map(({ id, owner }) => ({
    value: id,
    label: owner,
  }));

  return (
    <FieldSelectFinal
      dataOptions={dataOptions}
      label={formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.transferOwner' })}
      name="exportTypeSpecificParameters.bursarFeeFines.feefineOwnerId"
      onChange={onChange}
      required
    />
  );
};

FeeFineOwnerField.propTypes = {
  onChange: PropTypes.func.isRequired,
};
