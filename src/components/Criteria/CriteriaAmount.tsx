import { Col, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import useMonetaryOnBlur from '../../hooks/useMonetaryOnBlur';
import OperatorSelect from './OperatorSelect';
import { FormattedMessage } from 'react-intl';

export default function CriteriaAmount({ prefix }: { prefix: string }) {
  const monetaryOnBlur = useMonetaryOnBlur(`${prefix}amountDollars`);

  return (
    <>
      <Col xs={6}>
        <OperatorSelect name={`${prefix}operator`} />
      </Col>
      <Col xs={6}>
        <Field name={`${prefix}amountDollars`}>
          {(fieldProps) => (
            <TextField<number>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              type="number"
              label={
                <FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.select.amount" />
              }
              min={0}
              step={0.01}
              onBlur={monetaryOnBlur}
            />
          )}
        </Field>
      </Col>
    </>
  );
}
