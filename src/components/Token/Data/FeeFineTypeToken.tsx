import { Col, Select, Label } from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import { useIntl } from 'react-intl';

export default function FeeFineTypeToken({ prefix }: Readonly<{ prefix: string }>) {
  const intl = useIntl();

  const selectedType = useField<'FEE_FINE_TYPE_ID' | 'FEE_FINE_TYPE_NAME'>(`${prefix}feeFineAttribute`, {
    subscription: { value: true }
  }).input.value;

  return (
    <Col xs={12}>
      <Label required>
        {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.token.feeFineType.attribute' })}
      </Label>
      <Field<'FEE_FINE_TYPE_ID' | 'FEE_FINE_TYPE_NAME'>
        name={`${prefix}feeFineAttribute`}
        defaultValue="FEE_FINE_TYPE_NAME"
      >
        {(fieldProps) => (
          <Select<'FEE_FINE_TYPE_ID' | 'FEE_FINE_TYPE_NAME'>
            {...fieldProps}
            required
            marginBottom0
            aria-label={selectedType ?
              intl.formatMessage({ id: `ui-plugin-bursar-export.bursarExports.token.feeFineType.${selectedType}` }) :
              intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.token.feeFineType.attribute' })}
            dataOptions={[
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.feeFineType.FEE_FINE_TYPE_NAME',
                }),
                value: 'FEE_FINE_TYPE_NAME',
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.feeFineType.FEE_FINE_TYPE_ID',
                }),
                value: 'FEE_FINE_TYPE_ID',
              },
            ]}
          />
        )}
      </Field>
    </Col>
  );
}
