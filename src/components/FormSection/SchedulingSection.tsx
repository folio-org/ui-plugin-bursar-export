import {
  Col,
  MultiSelection,
  MultiSelectionDefaultOptionType,
  Row,
  Select,
  TextField,
  Timepicker,
} from '@folio/stripes/components';
import React from 'react';
import { Field, useField } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Weekday } from '../../utils/weekdayUtils';
import { SchedulingFrequency } from '../../types';
import useLocaleWeekdays from '../../hooks/useLocaleWeekdays';

export default function SchedulingSection() {
  const frequencyValue = useField<SchedulingFrequency>('scheduling.frequency', {
    subscription: { value: true },
  }).input.value;

  const intl = useIntl();
  const localeWeekdays = useLocaleWeekdays(intl);

  const manualFrequencyComponent = (
    <Col xs={12} md={6}>
      <Field name="scheduling.frequency" defaultValue={SchedulingFrequency.Manual}>
        {(fieldProps) => (
          <Select<SchedulingFrequency>
            {...fieldProps}
            fullWidth
            required
            label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.scheduling.frequency" />}
            dataOptions={[
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.scheduling.frequency.manual',
                }),
                value: SchedulingFrequency.Manual,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.scheduling.frequency.hours',
                }),
                value: SchedulingFrequency.Hours,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.scheduling.frequency.days',
                }),
                value: SchedulingFrequency.Days,
              },
              {
                label: intl.formatMessage({
                  id: 'ui-plugin-bursar-export.bursarExports.scheduling.frequency.weeks',
                }),
                value: SchedulingFrequency.Weeks,
              },
            ]}
          />
        )}
      </Field>
    </Col>
  );

  const hoursDaysWeeksFrequencyComponent = (
    <Col xs={12} md={6}>
      <Field
        name="scheduling.interval"
        validate={(value) => Number.isNaN(+value) || +value <= 0 ? <FormattedMessage id="ui-plugin-bursar-export.bursarExports.scheduler.interval.error" /> : undefined}
      >
        {(fieldProps) => (
          <TextField<number>
            {...fieldProps}
            fullWidth
            required
            label={
              <FormattedMessage id={`ui-plugin-bursar-export.bursarExports.scheduling.interval.${frequencyValue}`} />
            }
            min={1}
          />
        )}
      </Field>
    </Col>
  );

  const daysWeeksFrequencyComponent = (
    <Col xs={12} md={6}>
      <Field name="scheduling.time">
        {(fieldProps) => (
          <Timepicker
            {...fieldProps}
            required
            label={intl.formatMessage({
              id: 'ui-plugin-bursar-export.bursarExports.scheduling.time',
            })}
          />
        )}
      </Field>
    </Col>
  );

  const weeksFrequencyComponent = (
    <Col xs={12} md={6}>
      <Field name="scheduling.weekdays">
        {(fieldProps) => (
          <MultiSelection<MultiSelectionDefaultOptionType<Weekday>>
            {...fieldProps}
            required
            label={<FormattedMessage id="ui-plugin-bursar-export.bursarExports.scheduling.weekdays" />}
            dataOptions={localeWeekdays.map((weekday) => ({
              label: weekday.long,
              value: weekday.weekday,
            }))}
          />
        )}
      </Field>
    </Col>
  );

  return (
    <Row>
      {manualFrequencyComponent}
      {[SchedulingFrequency.Hours, SchedulingFrequency.Days, SchedulingFrequency.Weeks].includes(frequencyValue) && hoursDaysWeeksFrequencyComponent}
      {[SchedulingFrequency.Days, SchedulingFrequency.Weeks].includes(frequencyValue) && daysWeeksFrequencyComponent}
      {frequencyValue === SchedulingFrequency.Weeks && weeksFrequencyComponent}
    </Row>
  );
}
