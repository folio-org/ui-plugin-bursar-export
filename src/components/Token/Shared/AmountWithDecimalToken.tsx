import { Checkbox, Col } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';

export default function AmountWithDecimalToken({ prefix }: { prefix: string }) {
  const intl = useIntl();
  return (
    <Col xs={12}>
      <Field name={`${prefix}decimal`} type="checkbox" defaultValue={true}>
        {(fieldProps) => (
          <Checkbox
            {...fieldProps}
            fullWidth
            label={intl.formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.token.accountAmount.enableDecimal',
            })}
          />
        )}
      </Field>
      <p style={{ margin: 0 }}>
        <i>
          {intl.formatMessage({
            id: 'ui-plugin-bursar-export.bursarExports.token.accountAmount.enableDecimal.description',
          })}
        </i>
      </p>
    </Col>
  );
}
