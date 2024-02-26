import { Checkbox } from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import AggregateCriteriaCard from '../AggregateCriteria/AggregateCriteriaCard';

export default function AggregateSection() {
  const isAggregateEnabled = useField<boolean>('aggregate', {
    subscription: { value: true },
    format: (value) => value ?? false,
  }).input.value;

  const intl = useIntl();

  return (
    <div>
      <Field name="aggregate" type="checkbox" defaultValue={false}>
        {(fieldProps) => (
          <Checkbox
            {...fieldProps}
            fullWidth
            label={intl.formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.aggregate.enabler',
            })}
          />
        )}
      </Field>
      <p>
        <i>
          <FormattedMessage id="ui-plugin-bursar-export.bursarExports.aggregate.description" />
        </i>
      </p>

      {isAggregateEnabled && <AggregateCriteriaCard />}
    </div>
  );
}
