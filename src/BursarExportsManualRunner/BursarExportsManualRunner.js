import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  Button,
} from '@folio/stripes/components';
import {
  useShowCallout,
} from '@folio/stripes-acq-components';

import {
  useBursarExportSceduler,
} from '../apiQuery';

export const BursarExportsManualRunner = ({ disabled }) => {
  const { formatMessage } = useIntl();
  const showCallout = useShowCallout();

  const { scheduleBursarExport } = useBursarExportSceduler({
    onSuccess: () => {
      return showCallout({
        message: formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.runManually.success' }),
      });
    },
    onError: () => {
      return showCallout({
        message: formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.runManually.error' }),
        type: 'error',
      });
    },
  });

  return (
    <Button
      buttonStyle="default mega"
      disabled={disabled}
      onClick={scheduleBursarExport}
      type="button"
    >
      {formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.runManually' })}
    </Button>
  );
};

BursarExportsManualRunner.propTypes = {
  disabled: PropTypes.bool,
};
