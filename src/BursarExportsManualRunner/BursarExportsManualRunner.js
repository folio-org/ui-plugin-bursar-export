import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  Button,
} from '@folio/stripes/components';
import {
  useShowCallout,
} from '@folio/stripes-acq-components';

import {
  useBursarExportScheduler,
} from '../apiQuery';

export const BursarExportsManualRunner = ({ form, disabled }) => {
  const { formatMessage } = useIntl();
  const showCallout = useShowCallout();

  const { isLoading, scheduleBursarExport } = useBursarExportScheduler({
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

  const scheduleBursarExportWithParams = useCallback(() => {
    scheduleBursarExport(form.getState().values.exportTypeSpecificParameters);
  }, [scheduleBursarExport, form]);

  return (
    <Button
      buttonStyle="default mega"
      disabled={disabled || isLoading}
      onClick={scheduleBursarExportWithParams}
      type="button"
    >
      {formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.runManually' })}
    </Button>
  );
};

BursarExportsManualRunner.propTypes = {
  form: PropTypes.object,
  disabled: PropTypes.bool,
};
