import { Button, LoadingPane, Pane, PaneFooter } from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';
import { FormApi } from 'final-form';
import React, { useCallback, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import formValuesToDto from './api/dto/to/formValuesToDto';
import schedulingToDto from './api/dto/to/schedulingToDto';
import useAutomaticSchedulerMutation from './api/mutators/useAutomaticSchedulerMutation';
import useManualSchedulerMutation from './api/mutators/useManualSchedulerMutation';
import ConfigurationForm from './components/form/ConfigurationForm';
import useInitialValues from './hooks/useInitialValues';
import FormValues from './types/FormValues';
import { FORM_ID } from './constants';

export default function BursarExportPlugin() {
  const stripes = useStripes();

  const scheduleManually = useManualSchedulerMutation();
  const scheduleAutomatically = useAutomaticSchedulerMutation();

  const formApiRef = useRef<FormApi<FormValues>>(null);

  const submitCallback = useCallback((values: FormValues) => {
    if (values.buttonClicked === 'manual') {
      scheduleManually(formValuesToDto(values));
    } else {
      scheduleAutomatically({
        bursar: formValuesToDto(values),
        scheduling: schedulingToDto(values.scheduling),
      });
    }
  }, [scheduleAutomatically, scheduleManually]);

  const initialValues = useInitialValues();

  const handleRunManuallyClick = useCallback(() => {
    formApiRef.current?.change('buttonClicked', 'manual');
  }, []);

  const handleSaveClick = useCallback(() => {
    formApiRef.current?.change('buttonClicked', 'save');
  }, []);


  const footer = (
    <PaneFooter
      renderStart={
        <Button
          disabled={initialValues == null || !stripes.hasPerm('data-export.job.item.post')}
          type="submit"
          form={FORM_ID}
          onClick={handleRunManuallyClick}
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
          onClick={handleSaveClick}
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
      <ConfigurationForm initialValues={initialValues} onSubmit={submitCallback} formApiRef={formApiRef} />
    </Pane>
  );
}
