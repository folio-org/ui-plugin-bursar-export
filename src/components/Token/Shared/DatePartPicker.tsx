import { Select } from '@folio/stripes/components';
import React from 'react';
import { Field } from 'react-final-form';
import { DateFormatType } from '../../../types/TokenTypes';
import { FormattedMessage, useIntl } from 'react-intl';

export default function DatePartPicker({ prefix }: { prefix: string }) {
  const intl = useIntl();
  return (
    <Field name={`${prefix}format`} defaultValue={DateFormatType.YEAR_LONG}>
      {(fieldProps) => (
        <Select<DateFormatType>
          {...fieldProps}
          required
          marginBottom0
          label={
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.token.currentDate.format" />
          }
          dataOptions={[
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.yearLong',
              }),
              value: DateFormatType.YEAR_LONG,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.yearShort',
              }),
              value: DateFormatType.YEAR_SHORT,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.dayOfYear',
              }),
              value: DateFormatType.DAY_OF_YEAR,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.month',
              }),
              value: DateFormatType.MONTH,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.date',
              }),
              value: DateFormatType.DATE,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.hour',
              }),
              value: DateFormatType.HOUR,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.minute',
              }),
              value: DateFormatType.MINUTE,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.second',
              }),
              value: DateFormatType.SECOND,
            },

            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.quarter',
              }),
              value: DateFormatType.QUARTER,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.isoWeekNum',
              }),
              value: DateFormatType.WEEK_OF_YEAR_ISO,
            },
            {
              label: intl.formatMessage({
                id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.isoWeekYear',
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
                id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.format.YYYY-MM-DD',
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
  );
}
