import { Select, Label } from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import { useIntl } from 'react-intl';
import { DateFormatType } from '../../../types';

export default function DatePartPicker({ prefix }: Readonly<{ prefix: string }>) {
  const intl = useIntl();

  const selectedFormat = useField<DateFormatType>(`${prefix}format`, {
    subscription: { value: true },
  }).input.value;

  return (
    <>
      <Label required>
        {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format' })}
      </Label>
      <Field name={`${prefix}format`} defaultValue={DateFormatType.YEAR_LONG}>
        {(fieldProps) => (
          <Select<DateFormatType>
            {...fieldProps}
            required
            aria-label={selectedFormat.length === 0 ? 
              intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format' }) :
              intl.formatMessage({ id: `ui-plugin-bursar-export.bursarExports.token.currentDate.format.${selectedFormat}` })
            }
            dataOptions={[
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.YEAR_LONG',
                }),
                value: DateFormatType.YEAR_LONG,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.YEAR_SHORT',
                }),
                value: DateFormatType.YEAR_SHORT,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.DAY_OF_YEAR',
                }),
                value: DateFormatType.DAY_OF_YEAR,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.MONTH',
                }),
                value: DateFormatType.MONTH,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.DATE',
                }),
                value: DateFormatType.DATE,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.HOUR',
                }),
                value: DateFormatType.HOUR,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.MINUTE',
                }),
                value: DateFormatType.MINUTE,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.SECOND',
                }),
                value: DateFormatType.SECOND,
              },

              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.QUARTER',
                }),
                value: DateFormatType.QUARTER,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.WEEK_OF_YEAR_ISO',
                }),
                value: DateFormatType.WEEK_OF_YEAR_ISO,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.WEEK_YEAR_ISO',
                }),
                value: DateFormatType.WEEK_YEAR_ISO,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.YYYYMMDD',
                }),
                value: DateFormatType.YYYYMMDD,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.YYYY_MM_DD',
                }),
                value: DateFormatType.YYYY_MM_DD,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.MMDDYYYY',
                }),
                value: DateFormatType.MMDDYYYY,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.DDMMYYYY',
                }),
                value: DateFormatType.DDMMYYYY,
              },
            ]}
          />
        )}
      </Field>
    </>
  );
}
