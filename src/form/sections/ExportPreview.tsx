import React from 'react';
import css from './ExportPreview.module.css';
import { Card, Checkbox } from '@folio/stripes/components';
import classNames from 'classnames';
import { Field, useField } from 'react-final-form';
import ExportPreviewData from '../../components/ExportPreview/ExportPreviewData';
import { FormattedMessage, useIntl } from 'react-intl';

export default function ExportPreview() {
  const wrap = useField<boolean>('preview.wrap', {
    subscription: { value: true },
    format: (value) => value ?? true,
  }).input.value;

  const intl = useIntl();

  return (
    <>
      <Card
        headerStart={
          <FormattedMessage id="ui-plugin-bursar-export.bursarExports.preview.header" />
        }
        bodyClass={classNames(css.preview, { [css.wrap]: wrap })}
      >
        <ExportPreviewData />
      </Card>
      <p>
        <i>
          <FormattedMessage id="ui-plugin-bursar-export.bursarExports.preview.description" />
        </i>
      </p>
      <Field name="preview.wrap" type="checkbox" defaultValue={true}>
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
