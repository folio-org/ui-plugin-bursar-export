import { Col, Select, SelectOptionType, TextField } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
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
  return (
    <>
      <Col xs={12} md={6}>
        <Field<T> name={`${prefix}${attributeName}`} defaultValue={defaultValue}>
          {(fieldProps) => (
            <Select<T>
              {...fieldProps}
              required
              label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.token.value" />}
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
