import { Select, timezones } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';

export default function TimezonePicker({ prefix }: Readonly<{ prefix: string }>) {
  const intl = useIntl();

  const timeZonesForSelect = useMemo(() => timezones.map(({ value }) => ({ value, label: value })), [timezones]);

  return (
    <Field name={`${prefix}timezone`} defaultValue={intl.timeZone ?? 'UTC'}>
      {(fieldProps) => (
        <Select<string>
          {...fieldProps}
          required
          marginBottom0
          label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.token.currentDate.timezone" />}
          dataOptions={timeZonesForSelect}
        />
      )}
    </Field>
  );
}
