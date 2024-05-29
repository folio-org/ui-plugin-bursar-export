import { Select, timezones, Label } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import { useIntl } from 'react-intl';

export default function TimezonePicker({ prefix }: Readonly<{ prefix: string }>) {
  const intl = useIntl();

  const timeZonesForSelect = useMemo(() => timezones.map(({ value }) => ({ value, label: value })), []);

  const selectedTimezone = useField<string>(`${prefix}timezone`, {
    subscription: { value: true },
  }).input.value;
  const timeZoneLabel = timeZonesForSelect.find((tz) => tz.value === selectedTimezone)?.label;

  return (
    <>
      <Label required>
        {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.timezone' })}
      </Label>
      <Field name={`${prefix}timezone`} defaultValue={intl.timeZone ?? 'UTC'}>
        {(fieldProps) => (
          <Select<string>
            {...fieldProps}
            required
            marginBottom0
            aria-label={timeZoneLabel?.length === 0 ? timeZoneLabel :
              intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.token.currentDate.timezone' })
            }
            dataOptions={timeZonesForSelect}
          />
        )}
      </Field>
    </>
  );
}
