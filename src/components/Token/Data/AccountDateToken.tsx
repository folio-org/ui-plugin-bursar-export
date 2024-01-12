import { Col, Select, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import DatePartPicker from '../Shared/DatePartPicker';
import TimezonePicker from '../Shared/TimezonePicker';
import { FormattedMessage, useIntl } from 'react-intl';

export default function AccountDateToken({ prefix }: { prefix: string }) {
  const intl = useIntl();
  return (
    <>
      <Col xs={12} md={6}>
        <Field<'CREATED' | 'UPDATED' | 'DUE' | 'RETURNED'>
          name={`${prefix}dateProperty`}
          defaultValue="CREATED"
        >
          {(fieldProps) => (
            <Select<'CREATED' | 'UPDATED' | 'DUE' | 'RETURNED'>
              {...fieldProps}
              required
              label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.token.accountDate.dateType" />}
              dataOptions={[
                {
                  label: intl.formatMessage({
                    id: 'ui-plugin-bursar-export.bursarExports.token.accountDate.dateType.created',
                  }),
                  value: 'CREATED',
                },
                {
                  label: intl.formatMessage({
                    id: 'ui-plugin-bursar-export.bursarExports.token.accountDate.dateType.updated',
                  }),
                  value: 'UPDATED',
                },
                {
                  label: intl.formatMessage({
                    id: 'ui-plugin-bursar-export.bursarExports.token.accountDate.dateType.dueItem',
                  }),
                  value: 'DUE',
                },
                {
                  label: intl.formatMessage({
                    id: 'ui-plugin-bursar-export.bursarExports.token.accountDate.dateType.dueLoan',
                  }),
                  value: 'RETURNED',
                },
              ]}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <DatePartPicker prefix={prefix} />
      </Col>
      <Col xs={12} md={6}>
        <Field name={`${prefix}placeholder`}>
          {(fieldProps) => (
            <TextField<string>
              {...fieldProps}
              fullWidth
              label={
                <FormattedMessage id="ui-plugin-bursar-export.bursarExports.token.fallback" />
              }
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <TimezonePicker prefix={prefix} />
      </Col>
      <Col xs={12}>
        <p style={{ margin: 0 }}>
          <i>
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.token.accountDate.fallback.description" />
          </i>
        </p>
      </Col>
    </>
  );
}
