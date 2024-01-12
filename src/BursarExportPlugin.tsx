import {
  Button,
  LoadingPane,
  Pane,
  PaneFooter,
} from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';
import { FormApi } from 'final-form';
import React, { useCallback, useRef } from 'react';
import formValuesToDto from './api/dto/to/formValuesToDto';
import schedulingToDto from './api/dto/to/schedulingToDto';
import useAutomaticSchedulerMutation from './api/mutators/useAutomaticSchedulerMutation';
import useManualSchedulerMutation from './api/mutators/useManualSchedulerMutation';
import ConfigurationForm, { FORM_ID } from './form/ConfigurationForm';
import useInitialValues from './hooks/useInitialValues';
import FormValues from './types/FormValues';
import { FormattedMessage } from 'react-intl';

export default function BursarExportPlugin() {
  const stripes = useStripes();

  const manualScheduler = useManualSchedulerMutation();
  const automaticScheduler = useAutomaticSchedulerMutation();

  const formApiRef = useRef<FormApi<FormValues>>(null);

  const submitCallback = useCallback(async (values: FormValues) => {
    if (values.buttonClicked === 'manual') {
      await manualScheduler(formValuesToDto(values));
    } else {
      await automaticScheduler({
        bursar: formValuesToDto(values),
        scheduling: schedulingToDto(values.scheduling),
      });
    }
  }, []);

  const initialValues = useInitialValues();

  if (initialValues === null) {
    return (
      <LoadingPane
        paneTitle={
          <FormattedMessage id="ui-plugin-bursar-export.bursarExports.paneTitle" />
        }
        defaultWidth="fill"
        footer={
          <PaneFooter
            renderStart={
              <Button disabled>
                <FormattedMessage id="ui-plugin-bursar-export.bursarExports.button.runManually" />
              </Button>
            }
            renderEnd={
              <Button disabled buttonStyle="primary">
                <FormattedMessage id="ui-plugin-bursar-export.bursarExports.button.save" />
              </Button>
            }
          />
        }
      />
    );
  }

  return (
    <Pane
      defaultWidth="fill"
      footer={
        <PaneFooter
          renderStart={
            <Button
              disabled={!stripes.hasPerm('data-export.job.item.post')}
              type="submit"
              form={FORM_ID}
              onClick={() =>
                formApiRef.current?.change('buttonClicked', 'manual')
              }
            >
              <FormattedMessage id="ui-plugin-bursar-export.bursarExports.button.runManually" />
            </Button>
          }
          renderEnd={
            <Button
              disabled={!stripes.hasPerm('data-export.config.item.post')}
              buttonStyle="primary"
              type="submit"
              form={FORM_ID}
              onClick={() =>
                formApiRef.current?.change('buttonClicked', 'save')
              }
            >
              <FormattedMessage id="ui-plugin-bursar-export.bursarExports.button.save" />
            </Button>
          }
        />
      }
      id="pane-batch-group-configuration"
      paneTitle={
        <FormattedMessage id="ui-plugin-bursar-export.bursarExports.paneTitle" />
      }
    >
      <ConfigurationForm
        initialValues={initialValues}
        onSubmit={submitCallback}
        formApiRef={formApiRef}
      />
    </Pane>
  );
}
