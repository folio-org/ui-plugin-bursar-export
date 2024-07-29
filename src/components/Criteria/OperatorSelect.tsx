import { Label, Select } from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import { useIntl } from 'react-intl';
import { ComparisonOperator } from '../../types';

export default function OperatorSelect({ name }: Readonly<{ name: string }>) {
  const intl = useIntl();


  const operatorValue = useField<ComparisonOperator | undefined>(name, {
    subscription: { value: true },
  }).input.value;

  return (
    <>
      <Label required>
        {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.aggregate.filter.operator' })}
      </Label>
      <Field name={name}>
        {(fieldProps) => (
          <Select<ComparisonOperator | undefined>
            {...fieldProps}
            fullWidth
            marginBottom0
            required
            aria-label={operatorValue?.length === 0 ?
              intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.aggregate.filter.operator' }) :
              intl.formatMessage({ id: `ui-plugin-bursar-export.bursarExports.aggregate.filter.operator.${operatorValue}` })}
            dataOptions={[
              { label: '', value: undefined },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.aggregate.filter.operator.LESS_THAN',
                }),
                value: ComparisonOperator.LESS_THAN,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.aggregate.filter.operator.LESS_THAN_EQUAL',
                }),
                value: ComparisonOperator.LESS_THAN_EQUAL,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.aggregate.filter.operator.GREATER_THAN',
                }),
                value: ComparisonOperator.GREATER_THAN,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.aggregate.filter.operator.GREATER_THAN_EQUAL',
                }),
                value: ComparisonOperator.GREATER_THAN_EQUAL,
              },
            ]}
          />
        )}
      </Field>
    </>
  );
}
