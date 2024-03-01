import { Col, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import OperatorSelect from './OperatorSelect';

export default function CriteriaAmount({ prefix }: Readonly<{ prefix: string }>) {
  return (
    <>
      <Col xs={6}>
        <OperatorSelect name={`${prefix}operator`} />
      </Col>
      <Col xs={6}>
        <Field name={`${prefix}amountCurrency`}>
          {(fieldProps) => (
            <TextField<number>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              type="number"
              label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.select.amount" />}
              min={0}
              step={0.01}
            />
          )}
        </Field>
      </Col>
    </>
  );
}
