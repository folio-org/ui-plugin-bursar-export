import { Col, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

export default function WhitespaceToken({ prefix }: { prefix: string }) {
  return (
    <Col xs={12}>
      <Field name={`${prefix}repeat`}>
        {(fieldProps) => (
          <TextField<number>
            {...fieldProps}
            fullWidth
            marginBottom0
            required
            type="number"
            min={1}
            label={
              <FormattedMessage id="ui-plugin-bursar-export.bursarExports.token.whitespace.numSpaces" />
            }
          />
        )}
      </Field>
    </Col>
  );
}
