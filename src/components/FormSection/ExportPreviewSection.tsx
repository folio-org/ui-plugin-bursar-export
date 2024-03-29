import React from 'react';
import { Card, Checkbox } from '@folio/stripes/components';
import classNames from 'classnames';
import { Field, useField } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import ExportPreview from '../ExportPreview';
import css from './ExportPreviewSection.module.css';

export default function ExportPreviewSection() {
  const wrap = useField<boolean>('preview.wrap', {
    subscription: { value: true },
    format: (value) => value ?? true,
  }).input.value;

  const intl = useIntl();

  return (
    <>
      <Card
        headerStart={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.preview.header" />}
        bodyClass={classNames(css.preview, { [css.wrap]: wrap })}
      >
        <ExportPreview />
      </Card>
      <p>
        <i>
          <FormattedMessage id="ui-plugin-bursar-export.bursarExports.preview.description" />
        </i>
      </p>
      <Field name="preview.wrap" type="checkbox" defaultValue>
        {(fieldProps) => (
          <Checkbox
            {...fieldProps}
            fullWidth
            label={intl.formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.preview.wrap',
            })}
          />
        )}
      </Field>
      <Field name="preview.invisible" type="checkbox" defaultValue={false}>
        {(fieldProps) => (
          <Checkbox
            {...fieldProps}
            fullWidth
            label={intl.formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.preview.enableInvisibleChar',
            })}
          />
        )}
      </Field>
    </>
  );
}
