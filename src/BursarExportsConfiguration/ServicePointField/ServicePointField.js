import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  FieldSelectFinal,
} from '@folio/stripes-acq-components';

import { useOwnerServicePointsQuery } from './useOwnerServicePointsQuery';

export const ServicePointField = ({ ownerId }) => {
  const { formatMessage } = useIntl();
  const { servicePoints } = useOwnerServicePointsQuery(ownerId);

  return (
    <FieldSelectFinal
      dataOptions={servicePoints}
      label={formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.servicePoint' })}
      name="exportTypeSpecificParameters.bursarFeeFines.servicePointId"
      required
      disabled={!ownerId}
    />
  );
};

ServicePointField.propTypes = {
  ownerId: PropTypes.string,
};
