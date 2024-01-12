import { Col, Select } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';

export default function FeeFineTypeToken({ prefix }: { prefix: string }) {
  const intl = useIntl();
  return (
    <Col xs={12}>
      <Field<'FEE_FINE_TYPE_ID' | 'FEE_FINE_TYPE_NAME'>
        name={`${prefix}feeFineAttribute`}
        defaultValue="FEE_FINE_TYPE_NAME"
      >
        {(fieldProps) => (
          <Select<'FEE_FINE_TYPE_ID' | 'FEE_FINE_TYPE_NAME'>
            {...fieldProps}
            required
            marginBottom0
            label={
              <FormattedMessage id="ui-plugin-bursar-export.bursarExports.token.feeFineType.attribute" />
            }
            dataOptions={[
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.feeFineType.name',
                }),
                value: 'FEE_FINE_TYPE_NAME',
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.feeFineType.id',
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
