import { Col, Select, SelectOptionType, TextField, Label } from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { ItemAttribute, UserAttribute } from '../../../types';
import css from '../TokenStyles.module.css';

export default function UserItemInfoToken<T extends ItemAttribute | UserAttribute>({
  defaultValue,
  prefix,
  attributeName,
  options,
}: Readonly<{
  defaultValue: T;
  prefix: string;
  attributeName: string;
  options: SelectOptionType<T>[];
}>) {
  const intl = useIntl();

  const selectedValue = useField<T>(`${prefix}${attributeName}`, {
    subscription: { value: true },
  }).input.value;

  const infoType = attributeName === 'userAttribute' ? 'userInfo' : 'itemInfo';

  return (
    <>
      <Col xs={12} md={6}>
        <Label required>
          {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.token.value' })}
        </Label>
        <Field<T> name={`${prefix}${attributeName}`} defaultValue={defaultValue}>
          {(fieldProps) => (
            <Select<T>
              {...fieldProps}
              required
              aria-label={selectedValue ?
                intl.formatMessage({ id: `ui-plugin-bursar-export.bursarExports.token.${infoType}.${selectedValue}` }) :
                intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.token.value' })}
              dataOptions={options}
            />
          )}
        </Field>
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
      <Col xs={12}>
        <p className={css.noMargin}>
          <i>
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.token.fallback.description" />
          </i>
        </p>
      </Col>
    </>
  );
}
