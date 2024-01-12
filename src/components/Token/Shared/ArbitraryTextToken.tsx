import { Col, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

export default function ArbitraryTextToken({ prefix }: { prefix: string }) {
  return (
    <Col xs={12}>
      <Field name={`${prefix}text`}>
        {(fieldProps) => (
          <TextField<string>
            {...fieldProps}
            fullWidth
            marginBottom0
            required
            label={
              <FormattedMessage id="ui-plugin-bursar-export.bursarExports.token.value" />
            }
          />
        )}
      </Field>
    </Col>
  );
}
