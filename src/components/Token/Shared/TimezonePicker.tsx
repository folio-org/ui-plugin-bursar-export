import { Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import timeZones from '../../../utils/timezones';

export default function TimezonePicker({ prefix }: { prefix: string }) {
  const intl = useIntl();

  const timeZonesForSelect = useMemo(
    () => timeZones.map(({ value }) => ({ value, label: value })),
    [timeZones]
  );

  return (
    <Field name={`${prefix}timezone`} defaultValue={intl.timeZone ?? 'UTC'}>
      {(fieldProps) => (
        <Select<string>
          {...fieldProps}
          required
          marginBottom0
          label={
            <FormattedMessage id="ui-plugin-bursar-export.bursarExports.token.currentDate.timezone" />
          }
          dataOptions={timeZonesForSelect}
        />
      )}
    </Field>
  );
}
