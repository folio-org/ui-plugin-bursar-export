import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import {
  Button,
  LoadingPane,
  Pane,
  PaneFooter,
} from '@folio/stripes/components';
import {
  useShowCallout,
} from '@folio/stripes-acq-components';

import {
  useBursarConfigQuery,
  useBursarConfigMutation,
  usePatronGroupsQuery,
} from './apiQuery';
import { BursarExportsConfiguration } from './BursarExportsConfiguration';
import { BursarExportsManualRunner } from './BursarExportsManualRunner';

export const BursarExports = () => {
  const { formatMessage } = useIntl();
  const showCallout = useShowCallout();

  const { patronGroups } = usePatronGroupsQuery();
  const { isLoading, bursarConfig } = useBursarConfigQuery();
  const { mutateBursarConfig } = useBursarConfigMutation({
    onSuccess: () => {
      return showCallout({
        message: formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.save.success' }),
      });
    },
    onError: () => {
      return showCallout({
        message: formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.save.error' }),
        type: 'error',
      });
    },
  });

  const [bursarConfigForm, setBursarConfigForm] = useState();
  const bursarConfigFormState = bursarConfigForm?.getState();

  const saveBursarConfig = () => {
    return bursarConfigForm?.submit();
  };

  const paneFooter = (
    <PaneFooter
      renderStart={
        <BursarExportsManualRunner
          form={bursarConfigForm}
          disabled={!(bursarConfig?.id && bursarConfigFormState?.pristine)}
        />
      }
      renderEnd={
        <Button
          buttonStyle="primary mega"
          disabled={bursarConfigFormState?.pristine || bursarConfigFormState?.submitting || isLoading}
          onClick={saveBursarConfig}
          type="submit"
        >
          {formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.save' })}
        </Button>
      }
    />
  );

  if (isLoading) {
    return (
      <LoadingPane
        paneTitle={formatMessage({ id: 'ui-plugin-bursar-export.meta.title' })}
        defaultWidth="fill"
        footer={paneFooter}
      />
    );
  }

  return (
    <Pane
      defaultWidth="fill"
      footer={paneFooter}
      id="pane-batch-group-configuration"
      paneTitle={formatMessage({ id: 'ui-plugin-bursar-export.meta.title' })}
    >
      <BursarExportsConfiguration
        initialValues={bursarConfig}
        onSubmit={mutateBursarConfig}
        onFormStateChanged={setBursarConfigForm}
        patronGroups={patronGroups}
      />
    </Pane>
  );
};
