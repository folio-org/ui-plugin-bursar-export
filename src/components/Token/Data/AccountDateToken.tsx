import { Col, Select, TextField, Label } from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import DatePartPicker from '../Shared/DatePartPicker';
import TimezonePicker from '../Shared/TimezonePicker';
import css from '../TokenStyles.module.css';

export default function AccountDateToken({ prefix }: Readonly<{ prefix: string }>) {
  const intl = useIntl();

  const selectedDateType = useField<'CREATED' | 'UPDATED' | 'DUE' | 'RETURNED'>(`${prefix}dateProperty`, {
    subscription: { value: true }
  }).input.value;

  return (
    <>
      <Col xs={12} md={6}>
        <Label required>
          {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.token.accountDate.dateType' })}
        </Label>
        <Field<'CREATED' | 'UPDATED' | 'DUE' | 'RETURNED'> name={`${prefix}dateProperty`} defaultValue="CREATED">
          {(fieldProps) => (
            <Select<'CREATED' | 'UPDATED' | 'DUE' | 'RETURNED'>
              {...fieldProps}
              required
              aria-label={selectedDateType ?
                intl.formatMessage({ id: `ui-plugin-bursar-export.bursarExports.token.accountDate.dateType.${selectedDateType}` }) :
                intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.token.accountDate.dateType' })}
              dataOptions={[
                {
                  label: intl.formatMessage({
                    id: 'ui-plugin-bursar-export.bursarExports.token.accountDate.dateType.CREATED',
                  }),
                  value: 'CREATED',
                },
                {
                  label: intl.formatMessage({
                    id: 'ui-plugin-bursar-export.bursarExports.token.accountDate.dateType.UPDATED',
                  }),
                  value: 'UPDATED',
                },
                {
                  label: intl.formatMessage({
                    id: 'ui-plugin-bursar-export.bursarExports.token.accountDate.dateType.DUE',
                  }),
                  value: 'DUE',
                },
                {
                  label: intl.formatMessage({
                    id: 'ui-plugin-bursar-export.bursarExports.token.accountDate.dateType.RETURNED',
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
              label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.token.fallback" />}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <TimezonePicker prefix={prefix} />
      </Col>
      <Col xs={12}>
        <p className={css.noMargin}>
          <i>
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.token.accountDate.fallback.description" />
          </i>
        </p>
      </Col>
    </>
  );
}
