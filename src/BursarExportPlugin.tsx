import { Button, LoadingPane, Pane, PaneFooter } from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';
import { FormApi } from 'final-form';
import React, { useCallback, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { formValuesToDto, schedulingToDto } from './api/dto/to';
import { useAutomaticSchedulerMutation, useManualSchedulerMutation } from './api/mutators';
import ConfigurationForm from './components/ConfigurationForm';
import { FORM_ID } from './constants';
import useInitialValues from './hooks/useInitialValues';
import { FormValues } from './types';

export default function BursarExportPlugin() {
  const stripes = useStripes();

  const initialValues = useInitialValues();
  const scheduleManually = useManualSchedulerMutation();
  const scheduleAutomatically = useAutomaticSchedulerMutation();

  const formApiRef = useRef<FormApi<FormValues>>(null);

  const submitCallback = useCallback(
    (values: FormValues) => {
      scheduleAutomatically({
        bursar: formValuesToDto(values),
        scheduling: schedulingToDto(values.scheduling),
      });
    },
    [scheduleAutomatically],
  );

  const runManuallyCallback = useCallback(() => {
    const values = formApiRef.current?.getState().values;
    if (values) {
      scheduleManually(formValuesToDto(values));
    }
  }, [formApiRef, scheduleManually]);

  const footer = (
    <PaneFooter
      renderStart={
        <Button
          disabled={initialValues == null || !stripes.hasPerm('data-export.job.item.post')}
          form={FORM_ID}
          onClick={runManuallyCallback}
        >
          <FormattedMessage id="ui-plugin-bursar-export.bursarExports.button.runManually" />
        </Button>
      }
      renderEnd={
        <Button
          disabled={initialValues == null || !stripes.hasPerm('data-export.config.item.post')}
          buttonStyle="primary"
          type="submit"
          form={FORM_ID}
        >
          <FormattedMessage id="ui-plugin-bursar-export.bursarExports.button.save" />
        </Button>
      }
    />
  );

  if (initialValues === null) {
    return (
      <LoadingPane
        paneTitle={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.paneTitle" />}
        defaultWidth="fill"
        footer={footer}
      />
    );
  }

  return (
    <Pane
      defaultWidth="fill"
      footer={footer}
      id="pane-batch-group-configuration"
      paneTitle={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.paneTitle" />}
    >
      <ConfigurationForm
        initialValues={initialValues}
        onSubmit={submitCallback}
        formApiRef={formApiRef}
      />
    </Pane>
  );
}
