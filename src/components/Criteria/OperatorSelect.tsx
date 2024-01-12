import { Select } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { ComparisonOperator } from '../../types/CriteriaTypes';
import { FormattedMessage, useIntl } from 'react-intl';

export default function OperatorSelect({ name }: { name: string }) {
  const intl = useIntl();
  return (
    <Field name={name}>
      {(fieldProps) => (
        <Select<ComparisonOperator | undefined>
          {...fieldProps}
          fullWidth
          marginBottom0
          required
          label={
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.aggregate.filter.operator" />
          }
          dataOptions={[
            { label: '', value: undefined },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.aggregate.filter.operator.less',
              }),
              value: ComparisonOperator.LESS_THAN,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.aggregate.filter.operator.lessEqual',
              }),
              value: ComparisonOperator.LESS_THAN_EQUAL,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.aggregate.filter.operator.greater',
              }),
              value: ComparisonOperator.GREATER_THAN,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.aggregate.filter.operator.greaterEqual',
              }),
              value: ComparisonOperator.GREATER_THAN_EQUAL,
            },
          ]}
        />
      )}
    </Field>
  );
}
