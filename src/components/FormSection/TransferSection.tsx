import { Card, Checkbox } from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import css from '../Card.module.css';
import TransferInfoSection from './TransferInfoSection';

export default function TransferSection() {
  const intl = useIntl();
  const isDryRun =
    useField<boolean>('dryRun', {
      subscription: { value: true },
    }).input.value === true;

  return (
    <>
      <Card
        headerStart={
          <FormattedMessage id="ui-plugin-bursar-export.bursarExports.transfer.dryRunHeader" />
        }
      >
        <Field name="dryRun" type="checkbox" defaultValue={false}>
          {(fieldProps) => (
            <Checkbox
              {...fieldProps}
              fullWidth
              label={intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.transfer.dryRunCheckbox',
              })}
            />
          )}
        </Field>

        <p className={css.dryRunCardP}>
          <FormattedMessage id="ui-plugin-bursar-export.bursarExports.transfer.dryRunDescription" />
        </p>
      </Card>

      {!isDryRun && <TransferInfoSection />}
    </>
  );
}
